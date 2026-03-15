function setActiveTab(tab) {
    document.querySelectorAll('.tab-item').forEach(function(e){
        if(e.getAttribute('data-for') == tab) {
            e.classList.add('active');
        } else {
            e.classList.remove('active');
        }
    });
}
function showTab() {
    if(document.querySelector('.tab-item.active')) {
        let activeTab = document.querySelector('.tab-item.active').getAttribute('data-for');
        document.querySelectorAll('.tab-body').forEach(function(e){
            if(e.getAttribute('data-item') == activeTab) {
                e.style.display = 'block';
            } else {
                e.style.display = 'none';
            }
        });
    }
}

if(document.querySelector('.tab-item')) {
    showTab();
    document.querySelectorAll('.tab-item').forEach(function(e){
        e.addEventListener('click', function(r) {
            setActiveTab( r.target.getAttribute('data-for') );
            showTab();
        });
    });
}

var feedPlaceholder = document.querySelector('.feed-new-input-placeholder');
var feedInput = document.querySelector('.feed-new-input');
if (feedPlaceholder && feedInput) {
    feedPlaceholder.addEventListener('click', function(obj){
        obj.target.style.display = 'none';
        feedInput.style.display = 'block';
        feedInput.focus();
        feedInput.innerText = '';
    });

    feedInput.addEventListener('blur', function(obj) {
        var value = obj.target.innerText.trim();
        if(value == '') {
            obj.target.style.display = 'none';
            feedPlaceholder.style.display = 'block';
        }
    });
}
