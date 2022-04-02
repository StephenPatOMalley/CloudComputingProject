export default async function handler(req, res) {
    await fetch('http://localhost:8000/getUser', {
        method: 'POST'
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        res.status(200).json(data);
    })
}
