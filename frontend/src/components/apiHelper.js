export default class APIHelper {
    static instance = null;

    getPrivateFeedback = async () => {
        const res = await fetch("/api/feedback/getFeedback", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
            .then(async res => {
                if (res.status !== 200) {
                    return { error: 'Error' };
                } else {
                    res = await res.json();
                    return res;
                }
            })
            .catch(err => { return { error: 'Error' }; });
        return res;
    }

    postPrivateFeedback = async (message, forumName) => {
        const res = await fetch('/api/feedback/submitFeedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: message,
                name: forumName
            })
        })
            .then(async res => {
                console.log(res.status)
                if (res.status !== 200) { return false; }
                else { return true; }
            })
            .catch(err => { return false; });
        return res;
    }

    getTopic = async (ID) => {
        const res = await fetch('/api/forum/getTopic/' + ID, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(async res => {
                if (res.status !== 200) {
                    return { error: 'Error' };
                } else {
                    res = await res.json();
                    return res;
                }
            })
            .catch(err => { return { error: 'Error' }; });
        return res;
    }

    postTopic = async (name, accessCode) => {
        const res = await fetch('/api/forum/postTopic', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                topicName: name,
                forumID: accessCode
            })
        })
            .then(async res => {
                if (res.status !== 200) {
                    return { error: 'Error' };
                } else {
                    res = await res.json();
                    return res;
                }
            })
            .catch(err => { return { error: 'Error' }; });
        return res;
    }

    postForum = async (name) => {
        const res = await fetch('/api/forum/postForum', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name })
        })
            .then(async res => {
                if (res.status !== 200) {
                    return { error: 'Error' };
                } else {
                    res = await res.json();
                    return res;
                }
            })
            .catch(err => { return { error: 'Error' }; });
        return res;
    }

    getForums = async () => {
        const res = await fetch('/api/forum/getForums', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(async res => {
                if (res.status !== 200) {
                    return { error: 'Error' };
                } else {
                    res = await res.json();
                    return res;
                }
            })
            .catch(err => { return { error: 'Error' }; });
        return res;
    }

    getForum = async (accessCode) => {
        const res = await fetch('/api/forum/getForum/' + accessCode, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(async res => {
                if (res.status !== 200) {
                    return { error: 'Error' };
                } else {
                    res = await res.json();
                    return res;
                }
            })
            .catch(err => { return { error: 'Error' }; });
        return res;
    }

    postComment = async (parentID, message) => {
        const res = await fetch('api/forum/postComment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                parentID: parentID,
                message: message
            })
        })
            .then(async res => {
                if (res.status !== 200) {
                    return { error: 'Error' };
                } else {
                    res = await res.json();
                    return res;
                }
            })
            .catch(err => { return { error: 'Error' }; });
        return res;
    }

    deleteEvent = async (ID) => {
        const res = await fetch('/api/forum/deleteEvent', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ID: ID })
        })
            .then(async res => {
                if (res.status !== 200) { return false; }
                else { return true; }
            })
            .catch(err => { return false; });
        return res;
    }

    static getInstance = () => {
        if (APIHelper.instance === null) { APIHelper.instance = new APIHelper(); }
        return this.instance;
    }
}