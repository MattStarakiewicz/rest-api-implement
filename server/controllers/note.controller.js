import Note from "../models/note";
import Lane from "../models/lane";
import uuid from "uuid";
import mongoose from "mongoose";

export function getSomething(req, res) {
  return res.status(200).end();
}

export function addNote(req, res) {
  const { note, laneId } = req.body;

  if (!note || !note.task || !laneId) {
    res.status(400).end();
  }

  const newNote = new Note({
    task: note.task
  });

  newNote.id = uuid();
  newNote.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    Lane.findOne({ id: laneId })
      .then(lane => {
        lane.notes.push(saved);
        return lane.save();
      })
      .then(() => {
        res.json(saved);
      });
  });
}

export function deleteNote(req, res) {
  let { laneId, _id } = req.body;

  if (!laneId || !_id) {
    return res.status(400).send({msg: "Missing arguments"});
  }

  Lane.update(
    { id: laneId },
    { $pull: { notes: `${_id}` } },
    { safe: true, multi: true }
  )
    .then(value => {
      Note.deleteOne({ _id }).then(value => {
        res.send(value);
      });
    })
    .catch(err => {
      res.status(400).send();
    });
}

export function editNote(req, res) {
  let { id } = req.params,
    { note } = req.body;

  if (!id || !note) {
    return res.status(400).send();
  }

  Note.updateOne(
    {
      id
    },
    {
      ...note
    }
  )
    .then(value => {
      res.send();
    })
    .catch(err => {
      res.status(400).send();
    });
}
