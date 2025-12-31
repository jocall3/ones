import mermaid, { MermaidConfig } from 'mermaid';

/**
 * Service to handle validation and rendering of Mermaid graphs.
 * Used to visualize the architecture and processes of the AI Bank project.
 */
export class MermaidService {
  private static instance: MermaidService;
  private isInitialized: boolean = false;

  private constructor() {
    // Private constructor to enforce singleton usage
  }

  /**
   * Get the singleton instance of the MermaidService.
   */
  public static getInstance(): MermaidService {
    if (!MermaidService.instance) {
      MermaidService.instance = new MermaidService();
    }
    return MermaidService.instance;
  }

  /**
   * Initializes the Mermaid library with default or custom settings.
   * Should be called before attempting to render graphs.
   * @param config Optional configuration overrides.
   */
  public initialize(config?: MermaidConfig): void {
    if (this.isInitialized) {
      return;
    }

    const defaultConfig: MermaidConfig = {
      startOnLoad: false,
      theme: 'neutral', // Professional theme suitable for banking/technical diagrams
      securityLevel: 'strict',
      logLevel: 'error',
      fontFamily: 'Arial, sans-serif',
      flowchart: {
        htmlLabels: true,
        curve: 'linear',
      },
      er: {
        useMaxWidth: true,
      },
      sequence: {
        useMaxWidth: true,
      },
    };

    mermaid.initialize({ ...defaultConfig, ...config });
    this.isInitialized = true;
  }

  /**
   * Validates if the provided string is valid Mermaid syntax.
   * @param graphDefinition The raw Mermaid string to validate.
   * @returns A promise that resolves to true if valid, false otherwise.
   */
  public async validate(graphDefinition: string): Promise<boolean> {
    if (!this.isInitialized) {
      this.initialize();
    }

    try {
      // mermaid.parse throws an error if the syntax is invalid
      await mermaid.parse(graphDefinition);
      return true;
    } catch (error) {
      console.warn('Mermaid syntax validation failed:', error);
      return false;
    }
  }

  /**
   * Renders a Mermaid string into an SVG string.
   * @param id A unique identifier for the graph (used for the temporary DOM element id).
   * @param graphDefinition The Mermaid syntax string to render.
   * @returns A promise that resolves to the SVG string.
   */
  public async renderToSvg(id: string, graphDefinition: string): Promise<string> {
    if (!this.isInitialized) {
      this.initialize();
    }

    // Sanitize ID to ensure it is a valid HTML ID
    const safeId = `mermaid-${id.replace(/[^a-zA-Z0-9-_]/g, '')}`;

    try {
      // Validate first to avoid unhandled render exceptions
      const isValid = await this.validate(graphDefinition);
      if (!isValid) {
        throw new Error(`Invalid Mermaid syntax for graph: ${id}`);
      }

      // mermaid.render returns an object containing the SVG string
      const renderResult = await mermaid.render(safeId, graphDefinition);
      
      return renderResult.svg;
    } catch (error) {
      console.error(`Failed to render Mermaid graph [${id}]:`, error);
      throw new Error(`Mermaid rendering failed: ${(error as Error).message}`);
    }
  }
}

export const mermaidService = MermaidService.getInstance();