// models/Travel.js

class Travel {
    constructor(title, description, dateFrom, dateTo, country, city, image, userNickname) {
      this.title = title;
      this.description = description;
      this.dateFrom = dateFrom;
      this.dateTo = dateTo;
      this.location = { country: country, city: city };
      this.image = image;
      this.createdAt = new Date();
      this.user = userNickname;
    }
  }
  
  export default Travel;