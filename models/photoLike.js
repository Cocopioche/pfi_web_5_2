import Model from './model.js';
import UserModel from './user.js';
import PhotoLikeModel from './photoLike.js';
import Repository from '../models/repository.js';

export default class PhotoLike extends Model {
    constructor()
    {
        super();
        this.addField('PhotoId', 'string');
        //this.addField('Title', 'string');
        this.addField('Likers', 'array');
        this.addField('Likes','integer');

        this.setKey("PhotoId");
    }

    bindExtraData(instance) {

        return instance;
    }
}