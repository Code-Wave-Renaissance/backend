class Task {
    constructor(id, fid, displayName, pfpUrl, title, description, price) {
        (this.id = id),
        (this.fid = fid),
        (this.displayName = displayName),
        (this.pfpUrl = pfpUrl);
        (this.title = title),
        (this.description = description),
        (this.price = price);
    }
}

export default Task;
