class Task {
    constructor(id, fid, displayName, pfpUrl, title, description, price, verifiedAddresses, applicants, status) {
        (this.id = id),
        (this.fid = fid),
        (this.displayName = displayName),
        (this.pfpUrl = pfpUrl),
        (this.title = title),
        (this.description = description),
        (this.price = price),
        (this.verifiedAddresses = verifiedAddresses),
        (this.applicants = applicants);
        (this.status = status);
    }
}

export default Task;
