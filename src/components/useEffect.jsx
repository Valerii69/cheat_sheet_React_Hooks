/*useEffect
Хук useEffect() предназначен для запуска побочных эффектов (например, выполнение сетевого запроса или добавление обработчика событий) после монтирования и отрисовки компонента. Данная функция принимает колбек и массив зависимостей. Что касается массива зависимостей, то логика следующая:

массив не указан: эффект запускается при каждом рендеринге
указан пустой массив: эффект запускается только один раз
указан массив с элементами: эффект запускается при изменении любого элемента
Очистка эффектов производится посредством возвращения значений из хука.*/

// обработчик
const handler = () => {
    console.log('Случился клик!')
  }
  
  useEffect(() => {
    // запуск эффекта
    window.addEventListener('click', handler)
  
    // очистка эффекта
    return () => {
      window.removeEventListener('click', handler)
    }
    // массив зависимостей
  }, [handler])

//   Базовый пример
const BasicEffect = () => {
  const [age, setAge] = useState(19)

  const handleClick = () => setAge(age + 1)

  useEffect(() => {
    document.title = `Тебе ${age} лет!`
  })

  return (
    <>
      <p>Обратите внимание на заголовок текущей вкладки браузера.</p>
      <button onClick={handleClick}>Обновить заголовок!</button>
    </>
  )
}

// Очистка эффекта

const CleanupEffect = () => {
  useEffect(() => {
    const clicked = () => console.log('Клик!')

    window.addEventListener('click', clicked)

    return () => {
      window.removeEventListener('click', clicked)
    }
  }, [])

  return (
    <>
      <p>После клика по области просмотра в консоли появится сообщение.</p>
    </>
  )
}

// Несколько эффектов

const MultipleEffects = () => {
  useEffect(() => {
    const clicked = () => console.log('Клик!')

    window.addEventListener('click', clicked)

    return () => {
      window.removeEventListener('click', clicked)
    }
  }, [])

  useEffect(() => {
    console.log('Второй эффект.')
  })

  return (
    <>
      <p>Загляните в консоль.</p>
    </>
  )
}

Массив зависимостей
const DependencyEffect = () => {
  const [randomInt, setRandomInt] = useState(0)
  const [effectLogs, setEffectLogs] = useState([])
  const [count, setCount] = useState(1)

  useEffect(() => {
    setEffectLogs((prev) => [
      ...prev,
      `Вызов функции номер ${count}.`
    ])

    setCount(count + 1)
  }, [randomInt])

  return (
    <>
      <h3>{randomInt}</h3>
      <button onClick={() => setRandomInt(~~(Math.random() * 10))}>
        Получить случайное целое число!
      </button>
      <ul>
        {effectLogs.map((effect, i) => (
          <li key={i}>{' 😈 '.repeat(i) + effect}</li>
        ))}
      </ul>
    </>
  )
}

// Пропуск эффекта
const SkipEffect = () => {
  const [randomInt, setRandomInt] = useState(0)
  const [effectLogs, setEffectLogs] = useState([])
  const [count, setCount] = useState(1)

  useEffect(() => {
    setEffectLogs((prev) => [
      ...prev,
      `Вызов функции номер ${count}.`
    ])

    setCount(count + 1)
  }, [])

  return (
    <>
      <h3>{randomInt}</h3>
      <button onClick={() => setRandomInt(~~(Math.random() * 10))}>
        Получить случайное целое число!
      </button>
      <ul>
        {effectLogs.map((effect, i) => (
          <li key={i}>{' 😈 '.repeat(i) + effect}</li>
        ))}
      </ul>
    </>
  )
}

// Более сложный пример
const UserList = () => {
  const [users, setUsers] = useState([])
  const [count, setCount] = useState(1)
  const [url, setUrl] = useState(
    `https://jsonplaceholder.typicode.com/users?_limit=${count}`
  )

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch(url)
      const users = await response.json()
      setUsers(users)
    }
    fetchUsers()
  }, [url])

  const handleSubmit = (e) => {
    e.preventDefault()
    setUrl(`https://jsonplaceholder.typicode.com/users?_limit=${count}`)
  }

  return (
    <>
      <h1>Пользователи</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Сколько пользователей вы хотите получить?
          <input
            type='number'
            value={count}
            onChange={(e) => {
              setCount(e.target.value)
            }}
          />
          <button>Получить</button>
        </label>
      </form>
      <ul>
        {users.map(({ id, name, username, email, address: { city } }) => (
          <li key={id}>
            <span>
              <b>Имя:</b> {name}
            </span>
            <br />
            <span>
              <i>Имя пользователя:</i> {username}
            </span>
            <br />
            <span>
              <b>Адрес электронной почты:</b> {email}
            </span>
            <br />
            <span>
              <i>Город:</i> {city}
            </span>
            <br />
          </li>
        ))}
      </ul>
    </>
  )
}