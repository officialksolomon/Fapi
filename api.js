/*jshint esversion: 8 */
class Fetcher {
    // asynchronously fetch data
    async fetch_resource(url = "") {
        try {
            let response = await fetch(url);
            if (response.ok) {
                let data = await response.text();
                return { "data": data, "status": response.status };
            } else {

                return { "data": "Check your url, Make sure spellings are correct!, Might be an Internal Server Error, Try Again!", "status": response.status };
            }
        } catch (error) {
            return `${error.message} Please check your network or contact your internet provider`;
        }




    }
}
class Storage {
    // store request result
    save(key, data) {
        if (data && data.status === 200) {
            localStorage.setItem(key, data.data);
            return "Successfully saved to Local Storage.";
        }
        return "No data to Save! Make a Get request before Saving.";


    }

}

class Display {
    // ouputs request result to html
    display(data, displayElement) {
        displayElement.innerHTML = (data.data) ? data.data : data;
        displayElement.style.display = 'block';
    }
}

class API {
    constructor(url) {
        this.url = url;
        this.response_data = null;
        this.fetcher = new Fetcher();
        this.display = new Display();
        this.storage = new Storage();
    }
    // fetch and displays data using the correct object
    async load(element) {
        let result = await this.fetcher.fetch_resource(this.url);
        if (result) {
            this.response_data = result;
            this.display.display(this.response_data, element);
        }

    }

    save(key) {
        let message = this.storage.save(key, this.response_data);
        this.response_data = null;
        return message;
    }

}



export { API };
