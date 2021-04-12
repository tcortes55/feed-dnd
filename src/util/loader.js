export function hideLoader() {
    console.log("hideLoader");
    var loader = document.getElementById('cover-spin');
    loader.style.display = 'none';
}
  
export function showLoader() {
    console.log("showLoader");
    var loader = document.getElementById('cover-spin');
    loader.style.display = 'block';
}