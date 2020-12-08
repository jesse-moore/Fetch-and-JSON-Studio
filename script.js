window.addEventListener('load', () => initialzeAstronauts())

const initialzeAstronauts = async () => {
    const astronauts = await fetchAstronauts()
    const astronautDivs = astronauts
        .sort((a, b) => b.hoursInSpace - a.hoursInSpace)
        .map(createAstonautDiv)
    const countDiv = createCountDiv(astronauts.length)
    document.querySelector('#container').append(countDiv, ...astronautDivs)
}

const fetchAstronauts = async () => {
    const response = await fetch(
        'https://handlers.education.launchcode.org/static/astronauts.json'
    )
    return await response.json()
}

const createCountDiv = (count) => {
    const div = document.createElement('div')
    div.innerHTML = `<span>Number of Astronauts: ${count}</span>`
    return div
}

const createAstonautDiv = ({
    active,
    firstName,
    hoursInSpace,
    lastName,
    picture,
    skills,
}) => {
    const div = document.createElement('div')
    div.innerHTML = `<div class="astronaut">
	<div class="bio">
	   <h3>${firstName} ${lastName}</h3>
	   <ul>
		  <li>Hours in space: ${hoursInSpace}</li>
		  <li class=${active ? 'active' : 'inactive'}>Active: ${active}</li>
		  <li>Skills: ${skills.join(', ')}</li>
	   </ul>
	</div>
	<img class="avatar" src=${picture}>
 </div>`
    return div
}
