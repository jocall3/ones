/**
 * Utility class and helper functions to generate valid Mermaid.js syntax strings.
 * Used for visualizing plot structures, character relationships, and AI Bank technical architectures.
 */

// Types for Flowchart
export type FlowchartDirection = 'TB' | 'BT' | 'RL' | 'LR';

export type NodeShape = 
    | 'rectangle' 
    | 'round' 
    | 'stadium' 
    | 'subroutine' 
    | 'cylindrical' 
    | 'circle' 
    | 'rhombus' 
    | 'hexagon';

export interface MermaidNode {
    id: string;
    label: string;
    shape?: NodeShape;
    style?: string; // CSS styles
}

export interface MermaidEdge {
    sourceId: string;
    targetId: string;
    label?: string;
    type?: 'arrow' | 'dotted' | 'thick' | 'open';
}

export interface Subgraph {
    id: string;
    title: string;
    nodes: MermaidNode[];
    edges: MermaidEdge[];
    direction?: FlowchartDirection;
}

// Types for Sequence Diagram
export interface SequenceParticipant {
    id: string;
    alias?: string;
    type?: 'participant' | 'actor';
}

export interface SequenceMessage {
    fromId: string;
    toId: string;
    text: string;
    type?: 'solid' | 'dotted' | 'async' | 'sync';
    activate?: boolean;
    deactivate?: boolean;
}

// Types for Class Diagram (AI Bank Architecture)
export interface ClassProperty {
    visibility?: '+' | '-' | '#' | '~';
    name: string;
    type: string;
}

export interface ClassMethod {
    visibility?: '+' | '-' | '#' | '~';
    name: string;
    parameters?: string;
    returnType?: string;
}

export interface ClassDefinition {
    name: string;
    properties: ClassProperty[];
    methods: ClassMethod[];
    annotations?: string[]; // e.g., <<Interface>>, <<Service>>
}

export interface ClassRelationship {
    from: string;
    to: string;
    type: 'inheritance' | 'composition' | 'aggregation' | 'association' | 'dependency';
    label?: string;
    cardinalityFrom?: string;
    cardinalityTo?: string;
}

/**
 * Sanitizes text to be safe for Mermaid labels.
 * Replaces quotes and handles special characters.
 */
export const sanitizeText = (text: string): string => {
    if (!text) return '';
    // Remove newlines and replace double quotes with single quotes
    return text.replace(/[\r\n]+/g, ' ').replace(/"/g, "'").trim();
};

/**
 * Wraps text in quotes for Mermaid syntax.
 */
const quote = (text: string): string => `"${sanitizeText(text)}"`;

/**
 * Builder for Mermaid Flowcharts (Plot outlines, Process flows).
 */
export class MermaidFlowchartBuilder {
    private direction: FlowchartDirection = 'TD';
    private nodes: Map<string, MermaidNode> = new Map();
    private edges: MermaidEdge[] = [];
    private subgraphs: Subgraph[] = [];

    constructor(direction: FlowchartDirection = 'TD') {
        this.direction = direction;
    }

    public addNode(id: string, label: string, shape: NodeShape = 'rectangle', style?: string): this {
        this.nodes.set(id, { id, label, shape, style });
        return this;
    }

    public addEdge(sourceId: string, targetId: string, label?: string, type: MermaidEdge['type'] = 'arrow'): this {
        this.edges.push({ sourceId, targetId, label, type });
        return this;
    }

    public addSubgraph(subgraph: Subgraph): this {
        this.subgraphs.push(subgraph);
        return this;
    }

    private formatNode(node: MermaidNode): string {
        const text = quote(node.label);
        let shapeSyntax = '';
        
        switch (node.shape) {
            case 'round': shapeSyntax = `(${text})`; break;
            case 'stadium': shapeSyntax = `([${text}])`; break;
            case 'subroutine': shapeSyntax = `[[${text}]]`; break;
            case 'cylindrical': shapeSyntax = `[(${text})]`; break;
            case 'circle': shapeSyntax = `((${text}))`; break;
            case 'rhombus': shapeSyntax = `{${text}}`; break;
            case 'hexagon': shapeSyntax = `{{${text}}}`; break;
            case 'rectangle': default: shapeSyntax = `[${text}]`; break;
        }

        const line = `${node.id}${shapeSyntax}`;
        if (node.style) {
            return `${line}\n    style ${node.id} ${node.style}`;
        }
        return line;
    }

    private formatEdge(edge: MermaidEdge): string {
        let arrow = '-->';
        switch (edge.type) {
            case 'dotted': arrow = '-.->'; break;
            case 'thick': arrow = '==>'; break;
            case 'open': arrow = '---'; break;
        }

        if (edge.label) {
            // Insert label into arrow syntax
            if (edge.type === 'dotted') arrow = `-. ${sanitizeText(edge.label)} .->`;
            else if (edge.type === 'thick') arrow = `== ${sanitizeText(edge.label)} ==>`;
            else if (edge.type === 'open') arrow = `-- ${sanitizeText(edge.label)} ---`;
            else arrow = `-- ${sanitizeText(edge.label)} -->`;
        }

        return `${edge.sourceId} ${arrow} ${edge.targetId}`;
    }

    public build(): string {
        const lines: string[] = [`graph ${this.direction}`];

        // Render root nodes (those not in subgraphs)
        const subgraphNodeIds = new Set(this.subgraphs.flatMap(sg => sg.nodes.map(n => n.id)));
        
        this.nodes.forEach(node => {
            if (!subgraphNodeIds.has(node.id)) {
                lines.push(`    ${this.formatNode(node)}`);
            }
        });

        // Render Subgraphs
        this.subgraphs.forEach(sg => {
            lines.push(`    subgraph ${sg.id} [${quote(sg.title)}]`);
            if (sg.direction) lines.push(`    direction ${sg.direction}`);
            sg.nodes.forEach(node => {
                lines.push(`    ${this.formatNode(node)}`);
            });
            sg.edges.forEach(edge => {
                lines.push(`    ${this.formatEdge(edge)}`);
            });
            lines.push(`    end`);
        });

        // Render Root Edges
        this.edges.forEach(edge => {
            lines.push(`    ${this.formatEdge(edge)}`);
        });

        return lines.join('\n');
    }
}

/**
 * Builder for Mermaid Sequence Diagrams (Interactions, Dialogues).
 */
export class MermaidSequenceBuilder {
    private participants: SequenceParticipant[] = [];
    private messages: SequenceMessage[] = [];
    private autoNumber: boolean = false;

    constructor(autoNumber: boolean = false) {
        this.autoNumber = autoNumber;
    }

    public addParticipant(id: string, alias?: string, type: 'participant' | 'actor' = 'participant'): this {
        this.participants.push({ id, alias, type });
        return this;
    }

    public addMessage(
        fromId: string, 
        toId: string, 
        text: string, 
        type: SequenceMessage['type'] = 'solid',
        activate: boolean = false,
        deactivate: boolean = false
    ): this {
        this.messages.push({ fromId, toId, text, type, activate, deactivate });
        return this;
    }

    public build(): string {
        const lines: string[] = ['sequenceDiagram'];
        if (this.autoNumber) lines.push('    autonumber');

        this.participants.forEach(p => {
            const aliasStr = p.alias ? ` as ${quote(p.alias)}` : '';
            lines.push(`    ${p.type} ${p.id}${aliasStr}`);
        });

        this.messages.forEach(m => {
            let arrow = '->>';
            if (m.type === 'dotted') arrow = '-->>';
            if (m.type === 'async') arrow = '-)';
            
            lines.push(`    ${m.fromId}${arrow}${m.toId}: ${sanitizeText(m.text)}`);
            
            if (m.activate) lines.push(`    activate ${m.toId}`);
            if (m.deactivate) lines.push(`    deactivate ${m.fromId}`);
        });

        return lines.join('\n');
    }
}

/**
 * Builder for Mermaid Class Diagrams (Code Architecture, Data Models).
 */
export class MermaidClassDiagramBuilder {
    private classes: Map<string, ClassDefinition> = new Map();
    private relationships: ClassRelationship[] = [];

    public addClass(def: ClassDefinition): this {
        this.classes.set(def.name, def);
        return this;
    }

    public addRelationship(rel: ClassRelationship): this {
        this.relationships.push(rel);
        return this;
    }

    public build(): string {
        const lines: string[] = ['classDiagram'];

        this.classes.forEach(cls => {
            lines.push(`    class ${cls.name} {`);
            if (cls.annotations) {
                cls.annotations.forEach(ann => lines.push(`        ${ann}`));
            }
            cls.properties.forEach(prop => {
                lines.push(`        ${prop.visibility || ''}${prop.type} ${prop.name}`);
            });
            cls.methods.forEach(method => {
                lines.push(`        ${method.visibility || ''}${method.name}(${method.parameters || ''}) ${method.returnType || ''}`);
            });
            lines.push(`    }`);
        });

        this.relationships.forEach(rel => {
            let arrow = '--';
            switch (rel.type) {
                case 'inheritance': arrow = '<|--'; break;
                case 'composition': arrow = '*--'; break;
                case 'aggregation': arrow = 'o--'; break;
                case 'dependency': arrow = '..>'; break;
                case 'association': arrow = '-->'; break;
            }
            
            const fromCard = rel.cardinalityFrom ? `"${rel.cardinalityFrom}" ` : '';
            const toCard = rel.cardinalityTo ? ` "${rel.cardinalityTo}"` : '';
            const label = rel.label ? ` : ${sanitizeText(rel.label)}` : '';

            lines.push(`    ${rel.from} ${fromCard}${arrow}${toCard} ${rel.to}${label}`);
        });

        return lines.join('\n');
    }
}

/**
 * Helper to generate a simple Gantt chart for book timelines or project schedules.
 */
export const generateGanttChart = (
    title: string, 
    sections: { name: string; tasks: { name: string; status: string; id?: string; after?: string; duration?: string }[] }[]
): string => {
    const lines: string[] = ['gantt'];
    lines.push(`    title ${sanitizeText(title)}`);
    lines.push('    dateFormat YYYY-MM-DD');
    lines.push('    axisFormat %d-%b');

    sections.forEach(section => {
        lines.push(`    section ${sanitizeText(section.name)}`);
        section.tasks.forEach(task => {
            const parts = [sanitizeText(task.name), task.status];
            if (task.id) parts.push(task.id);
            if (task.after) parts.push(`after ${task.after}`);
            if (task.duration) parts.push(task.duration);
            
            lines.push(`    ${parts.join(', ')}`);
        });
    });

    return lines.join('\n');
};

/**
 * Helper to generate a Mindmap for brainstorming mystery plots.
 */
export const generateMindmap = (rootLabel: string, children: any[]): string => {
    const lines: string[] = ['mindmap'];
    
    const renderNode = (label: string, depth: number) => {
        const indent = '    '.repeat(depth);
        lines.push(`${indent}${sanitizeText(label)}`);
    };

    const traverse = (node: any, depth: number) => {
        if (typeof node === 'string') {
            renderNode(node, depth);
        } else if (typeof node === 'object') {
            for (const key in node) {
                renderNode(key, depth);
                if (Array.isArray(node[key])) {
                    node[key].forEach((child: any) => traverse(child, depth + 1));
                }
            }
        }
    };

    lines.push(`    root((${sanitizeText(rootLabel)}))`);
    children.forEach(child => traverse(child, 2));

    return lines.join('\n');
};