import Model from './model.js';
import UserModel from './user.js';
import PhotoLikeModel from './photoLike.js';
import Repository from '../models/repository.js';

export default class PhotoLike extends Model {
    constructor()
    {
        super();
        this.addField('LikeId', 'string');
        this.addField('PhotoId', 'string');
        this.addField('UserId', 'string');


        this.setKey("LikeId");
    }

    bindExtraData(instance) {

        return instance;
    }
}