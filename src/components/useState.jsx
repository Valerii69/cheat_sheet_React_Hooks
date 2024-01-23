/* Хук useState() предназначен для управления состоянием компонента. Данная функция возвращает пару геттер/сеттер - значение начального состояния и функцию для обновления этого значения. Функцию имеет следующую сигнатуру: const [value, setValue] = useState(defaultValue).*/

// Обновление одного состояния

const UpdateState = () => {
    const [age, setAge] = useState(19)
  
    const handleClick = () => setAge(age + 1)
  
    return (
      <>
        <p>Мне {age} лет.</p>
        <button onClick={handleClick}>Стать старше!</button>
      </>
    )
  }

//   Обновление нескольких состояний

const MultipleStates = () => {
  const [age, setAge] = useState(19)
  const [num, setNum] = useState(1)

  const handleAge = () => setAge(age + 1)
  const handleNum = () => setNum(num + 1)

  return (
    <>
      <p>Мне {age} лет.</p>
      <p>У меня {num} братьев и сестер.</p>
      <button onClick={handleAge}>Стать старше!</button>
      <button onClick={handleNum}>Больше братьев и сестер!</button>
    </>
  )
}

// Обновление объекта состояния

const StateObject = () => {
  const [state, setState] = useState({ age: 19, num: 1 })

  const handleClick = (val) =>
    setState({...state, [val]: state[val] + 1
    })

  const { age, num } = state
  return (
    <>
      <p>Мне {age} лет.</p>
      <p>У меня {num} братьев и сестер.</p>
      <button onClick={() => handleClick('age')}>Стать старше!</button>
      <button onClick={() => handleClick('num')}>
        Больше братьев и сестер!
      </button>
    </>
  )
}

// Счетчик

const CounterState = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <p>Значение счетчика: {count}.</p>
      <button onClick={() => setCount(0)}>Сбросить</button>
      <button onClick={() => setCount((prevVal) => prevVal + 1)}>Увеличить (+)</button>
      <button onClick={() => setCount((prevVal) => prevVal - 1)}>Уменьшить (-)</button>
    </>
  )
}

// Более сложный пример

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: 'Иван',
    lastName: 'Петров'
  })

  const handleChange = ({ target: { value, name } }) => {
    setProfile({ ...profile, [name]: value })
  }

  const { firstName, lastName } = profile
  return (
    <>
      <h1>Профиль</h1>
      <form>
        <input
          type='text'
          value={firstName}
          onChange={handleChange}
          name='firstName'
        /> <br />
        <input
          type='text'
          value={lastName}
          onChange={handleChange}
          name='lastName'
        />
      </form>
      <p>
        Имя: {firstName} <br />
        Фамилия: {lastName}
      </p>
    </>
  )
}