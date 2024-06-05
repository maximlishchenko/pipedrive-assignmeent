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

    constructor() {
        this.metrics = {
            getDeals: { callCount: 0, totalRequestDuration: 0 },
            addDeal: { callCount: 0, totalRequestDuration: 0 },
            updateDeal: { callCount: 0, totalRequestDuration: 0 }
        };
    }

    logRequest(endpoint: keyof IMetrics, duration: number) {
        if (this.metrics[endpoint]) {
            this.metrics[endpoint].callCount += 1;
            this.metrics[endpoint].totalRequestDuration += duration;
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