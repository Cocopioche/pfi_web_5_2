import Model from './model.js';
import UserModel from './user.js';
//import PhotoLikeModel from './photoLike.js';
import Repository from '../models/repository.js';

export default class Photo extends Model {
    constructor()
    {
        super();
        this.addField('OwnerId', 'string');
        this.addField('Title', 'string');        
        this.addField('Description', 'string');
        this.addField('Image', 'asset');
        this.addField('Date','integer');
        this.addField('Shared','boolean');
       // this.addField('Likes','array');


        this.setKey("Title");
    }

    bindExtraData(instance) {
        instance = super.bindExtraData(instance);
        let usersRepository = new Repository(new UserModel());
        instance.Owner = usersRepository.get(instance.OwnerId);
        if (instance.Owner != null) {
            instance.OwnerName = instance.Owner.Name;
            instance.Likes = [];
        }

        return instance;
    }
}