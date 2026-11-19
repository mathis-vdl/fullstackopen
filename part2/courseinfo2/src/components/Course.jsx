const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => {
  return (
    <div>
      {props.parts.map(part => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  )
}

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)


const Course = ({course}) => {
  console.log('Course: ', course)
  console.log('Course name: ', course.name)
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce((sum, part) => {
    console.log('sum, part : ', sum, part.name, part.exercises)
    return sum + part.exercises
  }, 0)

  return (
    <p>total of {total} exercices</p>
  )
}

export default Course