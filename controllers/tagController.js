const tagModel = require('../models/tagModel');

module.exports = {
  getAllTags: async () => {
    const tags = await tagModel.find();
    return tags;
  },

  getTag: async (id) => {
    const tag = await tagModel.findById(id);
    return tag;
  },

  postTag: async (data) => {
    console.log(data);
    const newTag = new tagModel(data);
    const savedTag = await newTag.save();
    return savedTag;
  },
};
