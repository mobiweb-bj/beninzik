export const fetchVideos = () => fetch('http://mobiweb.bj/mobileapps/musicQuiz/videos.php')
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log(err))