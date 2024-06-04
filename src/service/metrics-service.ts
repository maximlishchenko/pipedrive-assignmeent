import fs, { read } from 'fs';
import path from 'path';

interface IEndpointMetrics {
    callCount: number;
    totalRequestDuration: number;
}

interface IMetrics {
    getDeals: IEndpointMetrics;
    addDeal: IEndpointMetrics;
    updateDeal: IEndpointMetrics;
}

class MetricsService {
    private metrics: IMetrics;
    private dbFilePath: string;

    constructor() {
        this.dbFilePath = path.join(__dirname, '../..', '/src/mock-database/database.json');
        this.metrics = this.readMetricsFromFile();
    }

    private readMetricsFromFile(): IMetrics {
        try {
            const metricsData = fs.readFileSync(this.dbFilePath, 'utf8');
            return JSON.parse(metricsData).endpointMetrics;
        } catch (error) {
            console.error('Error reading metrics file:', error);
            return {
                getDeals: { callCount: 0, totalRequestDuration: 0 },
                addDeal: { callCount: 0, totalRequestDuration: 0 },
                updateDeal: { callCount: 0, totalRequestDuration: 0 }
            };
        }
    }

    private writeMetricsToFile() {
        try {
            const data = JSON.stringify({ endpointMetrics: this.metrics }, null, 2);
            fs.writeFileSync(this.dbFilePath, data, 'utf8');
        } catch (error) {
            console.error('Error writing to metrics file:', error);
        }
    }

    logRequest(endpoint: keyof IMetrics, duration: number) {
        if (this.metrics[endpoint]) {
            this.metrics[endpoint].callCount += 1;
            this.metrics[endpoint].totalRequestDuration += duration;
            this.writeMetricsToFile();
        }
    }

    getMetrics() {
        const calculateMeanDuration = (endpointMetrics: IEndpointMetrics) => {
            return endpointMetrics.callCount ? endpointMetrics.totalRequestDuration / endpointMetrics.callCount : 0;
        };

        return {
            getDeals: {
                count: this.metrics.getDeals.callCount,
                meanDuration: calculateMeanDuration(this.metrics.getDeals)
            },
            addDeal: {
                count: this.metrics.addDeal.callCount,
                meanDuration: calculateMeanDuration(this.metrics.addDeal)
            },
            updateDeal: {
                count: this.metrics.updateDeal.callCount,
                meanDuration: calculateMeanDuration(this.metrics.updateDeal)
            },
        };
    }
}

export const metricsService = new MetricsService();