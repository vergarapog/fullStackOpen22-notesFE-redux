import { connect } from "react-redux"
import { toggleImportanceOf } from "../reducers/noteReducer"
import noteService from "../services/noteService"

const Notes = (props) => {
  // const notes = useSelector(({ filter, notes }) => {
  //   if (filter === "ALL") {
  //     return notes
  //   } else if (filter === "IMPORTANT") {
  //     return notes.filter((note) => note.important)
  //   } else if (filter === "NONIMPORTANT") {
  //     return notes.filter((note) => !note.important)
  //   }
  // })

  const notes = () => {
    if (props.filter === "ALL") {
      return props.notes
    } else if (props.filter === "IMPORTANT") {
      return props.notes.filter((note) => note.important)
    } else if (props.filter === "NONIMPORTANT") {
      return props.notes.filter((note) => !note.important)
    }
  }

  const handleToggleImportance = async (note) => {
    const changedNote = { ...note, important: !note.important }
    await noteService.update(note.id, changedNote)
    props.toggleImportanceOf(note.id)
  }
  return (
    <ul>
      {notes().map((note) => (
        <Note
          key={note.id}
          note={note}
          handleClick={() => handleToggleImportance(note)}
        />
      ))}
    </ul>
  )
}

const Note = ({ note, handleClick }) => {
  return (
    <li key={note.id} onClick={handleClick}>
      {note.content} <strong>{note.important ? "important" : ""}</strong>
    </li>
  )
}

const mapStateToProps = (state) => {
  return {
    notes: state.notes,
    filter: state.filter,
  }
}

const mapDispatchToProps = {
  toggleImportanceOf,
}

const ConnectedNotes = connect(mapStateToProps, mapDispatchToProps)(Notes)

export default ConnectedNotes
