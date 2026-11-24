/**
 * Components available in every .mdx post without importing them:
 *   <Figure />, <Callout />, <PlotlyChart />, <Download />
 */
import Figure from './Figure.astro';
import Callout from './Callout.astro';
import PlotlyChart from './PlotlyChart.astro';
import Download from './Download.astro';

export const mdxComponents = { Figure, Callout, PlotlyChart, Download };
