// import mongoose from "mongoose";
import objectModel from "../models/object.js";

const ADD_OBJECT = async (req, res) => {
  try {
    const object = new objectModel({
      title: req.body.title,
      description: req.body.description,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      photo_url: req.body.photo_url,
      owner_id: req.body.userId,
    });

    const response = await object.save();
    console.log(response);
    return res.status(200).json({ response: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "post error" });
  }
};

const GET_OBJECTS = async (req, res) => {
  try {
    const objects = await objectModel.find({ owner_id: req.body.userId });
    console.log(objects);
    return res.status(200).json({ objects: objects });
  } catch (err) {
    console.log("Error:", err);
    return res.status(500).json({ message: "Error happened" });
  }
};

const GET_OBJECT_BY_ID = async (req, res) => {
  const object = await objectModel.findOne({ _id: req.params.id });
  return res.status(200).json({ object: object });
};

const GET_RANDOM_OBJECT = async (req, res) => {
  try {
    const objectNumber = await objectModel.countDocuments(); //suskaiciuoja kiek yra objektu is viso
    if (objectNumber === 0) {
      return res.status(404).json({ error: "No objects found." });
    }
    const randomIndex = Math.floor(Math.random() * objectNumber); // sugeneruoja random skaiciu is tiek kiek yra objektu
    const randomObject = await objectModel.findOne().skip(randomIndex); // suranda objekta kuris yra random skaicuje kuri sugeneravo
    if (!randomObject) {
      return res.status(404).json({ error: "Random object not found." });
    }
    return res.status(200).json({ object: randomObject });
  } catch (error) {
    console.error("Error", error);
    return res.status(500).json({ error: "Intrrnal server error" });
  }
};

const UPDATE_OBJECT = async (req, res) => {
  const updatedObject = await objectModel.findByIdAndUpdate(
    req.params.id, // suranda objekta pagal id kuri noriu paupdatinti
    { $set: req.body }, // update operacija, $set operatorius naudojamas updatinti body. vadinasi tiktai fieldai esantys req.body pasikeis
    { new: true } // metodas kuris grazina nauja modifikuota documenta, o ne originalu documenta. bet sitos eilutes, mongoose funkcija findByIdAndUpdate() grazintu toki documenta koks buvo priestai.
  );
  return res.status(200).json({ updatedObject: updatedObject });
};

const DELETE_OBJECT = async (req, res) => {
  const response = await objectModel.deleteOne({ _id: req.params.id });
  return res.status(200).json({ response: response });
};

export {
  ADD_OBJECT,
  GET_OBJECTS,
  GET_OBJECT_BY_ID,
  GET_RANDOM_OBJECT,
  UPDATE_OBJECT,
  DELETE_OBJECT,
};
