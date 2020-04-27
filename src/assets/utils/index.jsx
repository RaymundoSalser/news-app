export default class Utils{
	static getNews = (type, country, query) => {
		let url = `https://newsapi.org/v2/${type}`;
		let queryString = [];
		if(country) query = { ...query, country }
		if(query){
			Object.entries(query).map((elem, ind) => {
				let [ key, val ] = elem;
				return queryString.push(`${key}=${val}`);
			});
			url = `${url}?${queryString.join("&")}`;
		}

		return fetch(url, {
			method : "GET",
			headers: {
				'Authorization' : `Bearer ${process.env.REACT_APP_NEWS_TOKEN}`
			}
		})
		.then( (res) => res.json() )
	}

	static clearStr = (str, spaces = "-", lowercase = false) => {
		if(lowercase) str = str.toLowerCase();
		return str
			.replace(/[àáâãäå]/g,"a")
			.replace(/æ/g,"ae")
			.replace(/ç/g,"c")
			.replace(/[èéêë]/g,"e")
			.replace(/[ìíîï]/g,"i")
			.replace(/ñ/g,"n")
			.replace(/[òóôõö]/g,"o")
			.replace(/œ/g,"oe")
			.replace(/[ùúûü]/g,"u")
			.replace(/[ýÿ]/g,"y")
			.replace(/\W/g,spaces)
			.replace(/\s/g,spaces)
	}
}