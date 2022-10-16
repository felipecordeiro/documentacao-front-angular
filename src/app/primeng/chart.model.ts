export interface ChartModel {
    labels: string[]
    datasets: { data: number[], backgroundColor: string[], hoverBackgroundColor?: string[] }[]
}