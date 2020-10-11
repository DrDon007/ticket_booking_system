import mongoose from "mongoose";

const Search = new mongoose.Schema({
    start : {type: 'string', required: true},
    end: {type: 'string', required: true}
});


  const trainSearch = mongoose.model("trainSearch", Search);

  export default trainSearch;