const Tracking = require("../models/Tracking");

//Agregar tracking
exports.add = async (req, res) => {
  const tracking = new Tracking(req.body);
  try {
    tracking._id = req.body.noenvio;
    var jsonTrackin = new Object();
    jsonTrackin.latitude = req.body.latitude;
    jsonTrackin.longitude = req.body.longitude;

    var date =
      parseInt(new Date(parseInt(req.body.time, 10)).getDate() + 1) +
      "/" +
      parseInt(new Date(parseInt(req.body.time, 10)).getMonth()) +
      "/" +
      new Date(parseInt(req.body.time, 10)).getFullYear() +
      " " +
      new Date(parseInt(req.body.time, 10)).toLocaleTimeString();
    jsonTrackin.time = date.toString();

    tracking.data = jsonTrackin;

    await tracking.save();
    res.status(200).json({ mensaje: "nuevo track insertado" });
  } catch (error) {
    var id = tracking.noenvio;
    const doc = await Tracking.findById(id);
    if (
      doc.data[doc.data.length - 1].latitude == jsonTrackin.latitude &&
      doc.data[doc.data.length - 1].longitude == jsonTrackin.longitude
    ) {
      doc.data.push(jsonTrackin);
      const update = { data: doc.data };
      doc.updateOne(update);
      await doc.save();
    }
    console.log(doc);
    res.send(error);
  }
};

//primera accion
exports.list = async (req, res) => {
  try {
    const tracking = await Tracking.find({});
    res.json(tracking);
  } catch (error) {
    console.log(error);
    res.send(error);
    next();
  }
};

//leer tracking por id
exports.show = async (req, res, nex) => {
  try {
    const tracking = await Tracking.findById(req.noenvio);
    if (!tracking) {
      res.json("No existe el cliente");
    }
    res.json(tracking);
  } catch (error) {
    res.status(400).json({ mensaje: "nuevo track insertado" });
    res.send(error);
    next();
  }
};
