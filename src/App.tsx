
import { useState } from 'react'
import './App.css'

type Task = {
  id: number
  title: string
  subject: string
  dueDate: string
  priority: string
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState('Medium')

  function addTask() {
    if (!title.trim() || !subject.trim() || !dueDate) {
      alert('Please fill in the task, subject and due date.')
      return
    }

    const newTask: Task = {
      id: Date.now(),
      title,
      subject,
      dueDate,
      priority,
    }

    setTasks((previousTasks) => [...previousTasks, newTask])
    setTitle('')
    setSubject('')
    setDueDate('')
    setPriority('Medium')
  }

  return (
    <main className="app">
      <header className="topbar">
        <h2>CampusFlow <span>AI</span></h2>
        <p>Your academic life, organized.</p>
      </header>

      <section className="hero">
        <p className="eyebrow">YOUR PERSONAL STUDY ASSISTANT</p>
        <h1>Make space for what matters.</h1>
        <p>Organize assignments, track deadlines and stay ahead.</p>
      </section>

      <section className="dashboard">
        <div className="stats">
          <article className="stat-card">
            <p>Total tasks</p>
            <h2>{tasks.length}</h2>
          </article>
          <article className="stat-card">
            <p>High priority</p>
            <h2>{tasks.filter((task) => task.priority === 'High').length}</h2>
          </article>
          <article className="stat-card">
            <p>Upcoming deadlines</p>
            <h2>{tasks.filter((task) => task.dueDate >= new Date().toLocaleDateString('en-CA')).length}</h2>
          </article>
        </div>

        <div className="content-grid">
          <section className="panel">
            <h2>Add a task</h2>
            <p className="muted">Keep your academic responsibilities in one place.</p>

            <form onSubmit={(event) => {
              event.preventDefault()
              addTask()
            }}>
              <label htmlFor="title">Assignment or task</label>
              <input id="title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Complete ML assignment" />

              <label htmlFor="subject">Subject</label>
              <input id="subject" value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="e.g. Machine Learning" />

              <label htmlFor="dueDate">Due date</label>
              <input id="dueDate" type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} />

              <label htmlFor="priority">Priority</label>
              <select id="priority" value={priority} onChange={(event) => setPriority(event.target.value)}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

              <button type="submit">+ Add task</button>
            </form>
          </section>

          <section className="panel">
            <h2>Your tasks</h2>
            <p className="muted">Everything you need to work on.</p>

            {tasks.length === 0 ? (
              <div className="empty-state">
                <span>✦</span>
                <p>No tasks yet</p>
                <p>Add your first assignment to get started.</p>
              </div>
            ) : (
              <div className="task-list">
                {tasks.map((task) => (
                  <article className="task-card" key={task.id}>
                    <div>
                      <h3>{task.title}</h3>
                      <p>{task.subject}</p>
                      <p>Due: {task.dueDate}</p>
                    </div>
                    <span className={`priority ${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </span>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </section>
      <footer>Built for students, powered by possibilities.</footer>
    </main>
  )
}

export default App
