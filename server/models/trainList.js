import mongoose from "mongoose";

const List = new mongoose.Schema({
    trainName: {type: 'string', required: true},
    trainNo: {type: 'string', required: true},
    start : {type: 'string', required: true},
    end: {type: 'string', required: true}
});
List.static("findById", function (id) {
    return this.find({ id });
  });

  const TrainList = mongoose.model("TrainList", List);

  export default TrainList;