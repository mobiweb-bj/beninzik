export function fetchVideos () {
    fetch('http://mobiweb.bj/mobileapps/musicQuiz/videos.php')
    .then(response => response.json())
    .then(data => this.setState({videos:data}))
    .catch(err => console.log(err))
}