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
        instance = super.bindExtraData(instance);
        let usersRepository = new Repository(new UserModel());
        let likeUser = usersRepository.get(instance.UserId);
        if (likeUser) {
            instance.UserName = likeUser.Name;
        }

        return instance;
    }
}