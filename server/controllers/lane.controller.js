import Lane from "../models/lane";
import Note from "../models/note";
import uuid from "uuid";

export function getSomething(req, res) {
  return res.status(200).end();
}

export function addLane(req, res) {
  if (!req.body.name) {
    res.status(403).end();
  }

  const newLane = new Lane(req.body);

  newLane.notes = [];

  newLane.id = uuid();
  newLane.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(saved);
  });
}

export function getLanes(req, res) {
  Lane.find().exec((err, lanes) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ lanes });
  });
}

export function deleteLane(req, res) {
  let { laneId } = req.params;
  if (!laneId) {
    return res.status(400).send();
  }
  Lane.findOne({ id: laneId }).exec((err, lane) => {
    if (err) {
      res.status(500).send(err);
    }
    lane.notes.forEach(value => {
      Note.deleteOne({ id: value.id })
    });
    lane.remove(() => {
      res.status(200).end();
    });
  });
}

export function editLane(req, res) {
  let { lane } = req.body,
    { id } = req.params;

  if (!id || !lane) {
    return res.status(400).send();
  }

  Lane.updateOne({ id }, { ...lane })
    .then(value => {
      res.send(value);
    })
    .catch(err => {
      res.status(400).send();
    });
}
