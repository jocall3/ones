import { useEffect, useState, useRef } from 'react';
import mermaid from 'mermaid';

// Initialize mermaid configuration
mermaid.initialize({
  startOnLoad: false,
  theme: 'neutral',
  securityLevel: 'loose',
  fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
  flowchart: {
    curve: 'basis',
    padding: 20
  }
});

interface UseMermaidRendererResult {
  svg: string;
  error: string | null;
  isRendering: boolean;
}

/**
 * Hook to handle the dynamic rendering and updating of Mermaid graphs based on plot progression.
 * 
 * @param graphDefinition - The mermaid syntax string representing the graph.
 * @param id - A unique identifier for the graph container (optional).
 * @returns Object containing the rendered SVG string, any error messages, and loading state.
 */
export const useMermaidRenderer = (
  graphDefinition: string,
  id: string = 'mermaid-chart'
): UseMermaidRendererResult => {
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isRendering, setIsRendering] = useState<boolean>(false);
  
  // Ref to track the last successfully rendered definition to prevent unnecessary re-renders
  const lastRenderedRef = useRef<string>('');

  useEffect(() => {
    let isMounted = true;

    const renderGraph = async () => {
      if (!graphDefinition) {
        setSvg('');
        return;
      }

      // Optimization: Skip if the definition hasn't changed
      if (graphDefinition === lastRenderedRef.current) {
        return;
      }

      setIsRendering(true);
      setError(null);

      try {
        // Validate syntax before attempting to render
        // Note: mermaid.parse is async in v10+
        const isValid = await mermaid.parse(graphDefinition);
        
        if (!isValid) {
          throw new Error('Invalid Mermaid syntax');
        }

        // Generate a unique ID for this render cycle to prevent DOM collisions
        // Mermaid requires the ID to be valid for a DOM element
        const uniqueId = `${id}-${Date.now()}`;

        // Render the graph
        // mermaid.render returns an object { svg } in v10+
        const { svg: renderedSvg } = await mermaid.render(uniqueId, graphDefinition);

        if (isMounted) {
          setSvg(renderedSvg);
          lastRenderedRef.current = graphDefinition;
        }
      } catch (err) {
        if (isMounted) {
          console.error('Mermaid rendering failed:', err);
          setError(err instanceof Error ? err.message : 'Unknown rendering error');
          // We do not clear the SVG on error to prevent flashing, 
          // allowing the UI to show the stale graph with an error overlay if desired.
        }
      } finally {
        if (isMounted) {
          setIsRendering(false);
        }
      }
    };

    renderGraph();

    return () => {
      isMounted = false;
    };
  }, [graphDefinition, id]);

  return { svg, error, isRendering };
};