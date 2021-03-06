
function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}




 const App = new Vue({
    el: '#app',
    data: {
        baseUrl: 'http://44.233.202.250:8080/v1/',
        creds: [],
        userName: '',
        rank: '',
        degreeName: '',
        isIssuer: false,
        isStudent: true,
        isRelyingParty: false
    },
    created: function () {
        // now make an axios call
        this.userName=window.localStorage.getItem("userName");
        url = this.baseUrl+"admin/getMyCreds?userName="+this.userName 
        config = {headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}}
        axios.get(url, config)
            .then (response => {
                resp = response.data;
                this.creds = resp;
        })
        .catch (error => {
            alert(error);
        })
        
       
        
        
    },
    methods: {
        clearClicked: function() {
            this.userName=''
            this.degreeName=''
            this.rank=''
        },
        createClicked: function() {
        }
    }
})
