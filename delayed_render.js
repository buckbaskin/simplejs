console.log('delayed load script started');

var __dl__ = {
    'replaced_images': {},
};

function removeImages() {
    console.log('removeImages function started');
    var images = document.images;
    console.log('images.length => ' + images.length);

    var count = 0;
    while(images.length > 0) {
        console.log('' + count);
        var replacer = document.createElement('div');
        replacer.id = '__dl__ '+count;

        __dl__.replaced_images[replacer.id] = {
            'src': images[0].src,
            'src_id': images[0].id,
            'domE': images[0],
            'replacer': replacer,
            'replacer_id': replacer.id,
        };

        console.log(images[0].parentElement.replaceChild(replacer, images[0]));
        count += 1;
    }
    console.log('removeImages function finished');
}

function add_back_image(image_id) {
    console.log('add_back_image function started ('+image_id+')');
    if (image_id === undefined) {
        for (var key in __dl__.replaced_images) {
            if (__dl__.replaced_images.hasOwnProperty(key)) {
                console.log(key + " -> " + __dl__.replaced_images[key]);
                // __dl__.replaced_images[key].domE.onload = onload;
                var replacer = document.getElementById(key);
                replacer.parentElement.replaceChild(
                    __dl__.replaced_images[key].domE,
                    replacer,
                );
                delete __dl__.replaced_images[key];
                break;
            }
        }
    } else {
        for (var key in __dl__.replaced_images) {
            if (__dl__.replaced_images.hasOwnProperty(key)) {
                // console.log(key + " -> " + __dl__.replaced_images[key]);
                if (__dl__.replaced_images[key].src_id === image_id) {
                    var replacer = document.getElementById(key);
                    replacer.parentElement.replaceChild(
                        __dl__.replaced_images[key].domE,
                        replacer,
                    );
                    delete __dl__.replaced_images[key];
                    break;
                }
            }
        }
    }

    console.log('add_back_image function finished');
}

removeImages();
console.log('delayed load script finished');