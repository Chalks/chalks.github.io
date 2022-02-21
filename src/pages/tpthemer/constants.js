const CELL_X = 40;
const CELL_Y = 40;

const TILES_X = 640;
const TILES_Y = 440;

const SPEEDPAD_X = 200;
const SPEEDPAD_Y = 40;

const PORTAL_X = 200;
const PORTAL_Y = 40;

const SPLATS_X = 840;
const SPLATS_Y = 240;

const GRAVITY_X = 40;
const GRAVITY_Y = 40;

const TILES = 'tiles';
const SPEEDPAD = 'speedpad';
const SPEEDPAD_RED = 'speedpadred';
const SPEEDPAD_BLUE = 'speedpadblue';
const PORTAL = 'portal';
const PORTAL_RED = 'portalred';
const PORTAL_BLUE = 'portalblue';
const SPLATS = 'splats';
const GRAVITY_WELL = 'gravitywell';

const IMGUR_CLIENT_ID = '8a59567fddbfdab';
const IMGUR_ALBUM_URI = 'https://imgur.com/a';
const IMGUR_ALBUM_API = 'https://api.imgur.com/3/album';
const IMGUR_IMAGE_API = 'https://api.imgur.com/3/image';

const FORMCAKE_IMGUR_FORM_ID = '3b84d3ef-f9fa-4339-9cf6-a0b7889e1e69';
const FORMCAKE_FORM_API = 'https://api.formcake.com/api/form';
const FORMCAKE_SUBMISSION_URI = `${FORMCAKE_FORM_API}/${FORMCAKE_IMGUR_FORM_ID}/submission`;

const DEFAULT_EXPORT_STRING = 'NDUwNjEsMTc2LsQKMiw1xQgzxwg0xwg1xwg2xwg3xwg4LDE0xQk5LDE=';
const DEFAULT_IMGUR_UPLOAD = {
    albumId: 'KYKC3BV',
    images: {
        tiles: {link: 'https://i.imgur.com/SkR4paZ.png'},
        speedpad: {link: 'https://i.imgur.com/IUcxNlD.png'},
        speedpadred: {link: 'https://i.imgur.com/FMW988n.png'},
        speedpadblue: {link: 'https://i.imgur.com/URLvTb1.png'},
        portal: {link: 'https://i.imgur.com/7CjeVdy.png'},
        portalred: {link: 'https://i.imgur.com/7CjeVdy.png'},
        portalblue: {link: 'https://i.imgur.com/hrgC00o.png'},
        splats: {link: 'https://i.imgur.com/h22TjTf.png'},
        gravitywell: {link: 'https://i.imgur.com/bcjMW5e.png'},
    },
};

export default {
    CELL_X,
    CELL_Y,
    TILES_X,
    TILES_Y,
    SPEEDPAD_X,
    SPEEDPAD_Y,
    PORTAL_X,
    PORTAL_Y,
    SPLATS_X,
    SPLATS_Y,
    GRAVITY_X,
    GRAVITY_Y,
    TILES,
    SPEEDPAD,
    SPEEDPAD_RED,
    SPEEDPAD_BLUE,
    PORTAL,
    PORTAL_RED,
    PORTAL_BLUE,
    SPLATS,
    GRAVITY_WELL,
    IMGUR_CLIENT_ID,
    IMGUR_ALBUM_URI,
    IMGUR_ALBUM_API,
    IMGUR_IMAGE_API,
    FORMCAKE_IMGUR_FORM_ID,
    FORMCAKE_FORM_API,
    FORMCAKE_SUBMISSION_URI,
    DEFAULT_EXPORT_STRING,
    DEFAULT_IMGUR_UPLOAD,
};
