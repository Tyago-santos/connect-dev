document.addEventListener('DOMContentLoaded', function () {
  function setActiveTab(tab) {
    document.querySelectorAll('.tab-item').forEach(function (e) {
      if (e.getAttribute('data-for') == tab) {
        e.classList.add('active');
      } else {
        e.classList.remove('active');
      }
    });
  }
  function showTab() {
    if (document.querySelector('.tab-item.active')) {
      let activeTab = document
        .querySelector('.tab-item.active')
        .getAttribute('data-for');
      document.querySelectorAll('.tab-body').forEach(function (e) {
        if (e.getAttribute('data-item') == activeTab) {
          e.style.display = 'block';
        } else {
          e.style.display = 'none';
        }
      });
    }
  }

  if (document.querySelector('.tab-item')) {
    showTab();
    document.querySelectorAll('.tab-item').forEach(function (e) {
      e.addEventListener('click', function (r) {
        setActiveTab(r.target.getAttribute('data-for'));
        showTab();
      });
    });
  }

  var feedPlaceholder = document.querySelector('.feed-new-input-placeholder');
  var feedInput = document.querySelector('.feed-new-input');
  if (feedPlaceholder && feedInput) {
    feedPlaceholder.addEventListener('click', function (obj) {
      obj.target.style.display = 'none';
      feedInput.style.display = 'block';
      feedInput.focus();
      feedInput.innerText = '';
    });

    feedInput.addEventListener('blur', function (obj) {
      var value = obj.target.innerText.trim();
      if (value == '') {
        obj.target.style.display = 'none';
        feedPlaceholder.style.display = 'block';
      }
    });
  }

  const formPost = document.querySelector('.form_post');
  const buttonSubmit = document.querySelector('.feed-new-send');
  const newPostInput = document.querySelector('.feed-new-input');
  const postBodyInput = document.querySelector('input[name="body"]');

  // let buttonPhoto = document.querySelector('.feed-new-photo');
  // let feedFilePhoto = document.querySelector('.feed-new-file');

  // if (buttonPhoto && feedFilePhoto) {
  //   buttonPhoto.addEventListener('click', () => {
  //     feedFilePhoto.click();
  //   });
  // }

  if (formPost && buttonSubmit && newPostInput && postBodyInput) {
    buttonSubmit.addEventListener('click', () => {
      const value = newPostInput.innerText.trim();
      if (!value) {
        return;
      }
      postBodyInput.value = value;
      formPost.submit();
    });
  }

  document.querySelectorAll('.like-btn').forEach((item) => {
    item.addEventListener('click', () => {
      let id = item.closest('.feed-item').getAttribute('data-id');
      console.log(id);
      let count = parseInt(item.innerText);
      if (item.classList.contains('on') === false) {
        item.classList.add('on');
        // eslint-disable-next-line no-useless-assignment
        item.innerText = ++count;
      } else {
        item.classList.remove('on');
        // eslint-disable-next-line no-useless-assignment
        item.innerText = --count;
      }

      fetch('/ajax_like/' + id);
    });
  });

  document.querySelectorAll('.fic-item-field').forEach((item) => {
    item.addEventListener('keyup', async (e) => {
      if (e.keyCode == 13) {
        let id = item.closest('.feed-item').getAttribute('data-id');
        let txt = item.value;
        item.value = '';

        let data = new FormData();

        data.append('id', id);
        data.append('txt', txt);

        let req = await fetch('/ajax_comment', {
          method: 'POST',
          body: data,
        });
        let json = await req.json();

        if (json.name && json.body) {
          let html = '<div class="fic-item row m-height-10 m-width-20">';
          html += '<div class="fic-item-photo">';
          html +=
            '<a href="' + json.link + '"><img src="' + json.avatar + '" /></a>';
          html += '</div>';
          html += '<div class="fic-item-info">';
          html += '<a href="' + json.link + '">' + json.name + '</a>';
          html += ' ' + json.body;
          html += '</div>';
          html += '</div>';

          item
            .closest('.feed-item')
            .querySelector('.feed-item-comments-area').innerHTML += html;
        }
      }
    });
  });

  let feedPhoto = document.querySelector('.feed-new-photo');
  let feedFile = document.querySelector('.feed-new-file');

  if (feedPhoto && feedFile) {
    feedPhoto.addEventListener('click', function () {
      feedFile.click();
    });
    feedFile.addEventListener('change', async function () {
      let photo = feedFile.files[0];
      let formData = new FormData();

      formData.append('photo', photo);
      let req = await fetch('/ajax_upload', {
        method: 'POST',
        body: formData,
      });
      let json = await req.json();

      if (json.error != '') {
        alert(json.error);
      }

      // eslint-disable-next-line no-self-assign
      window.location.href = window.location.href;
    });
  }
});
