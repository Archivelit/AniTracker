import WatchStatus from "@/enums/watchStatus";

const ParseWatchStatus: (status: WatchStatus) => string = (status: WatchStatus) => {
    switch (status) {
        case WatchStatus.Completed:
            return "Completed";
        case WatchStatus.Watching:
            return "Watching";
        case WatchStatus.PlanToWatch:
            return "Plan to watch";
        case WatchStatus.Dropped:
            return "Dropped";
        case WatchStatus.OnHold:
            return "On hold";
        default:
            return "Undefined status";
    }
}; 

export default ParseWatchStatus;