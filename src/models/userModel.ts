import mongoose,{Schema,Document} from "mongoose";

export interface IuserPost extends Document{
    title: string;
    content: string;
    imageUrl: string;
    createsAt?: Date;
    updatedAt?: Date;
    likes?: number;
    comments?: string[];
    userId: string; // Reference to the user who created the post
    category?: string; // Optional category field
}
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    isAdmin?: boolean;
    forgotPasswordToken?: string;
    forgetpasswordExpiry?: Date;
    verifyToken?: string;
    verifyTokenExpiry?: Date;
    Post:IuserPost[];
}
const PostSchema: Schema<IuserPost> = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    content: {
        type: String,
        required: [true, "Content is required"],
    },
    imageUrl: {
        type: String,
        required: [true, "Image URL is required"],
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    // },
    // updatedAt: {
    //     type: Date,
    //     default: Date.now,
    // },
    likes: {
        type: Number,
        default: 0,
    },
    comments: {
        type: [String],
        default: [],
    },
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'user',
    //     required: true,
    // },
    category:{
        type:String,
        default:"General"
    }
});

const userSchema:Schema<IUser> = new mongoose.Schema({
    username:{
        type:String,
        required: [true,"Username is required"],
        unique: true,
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },

    forgotPasswordToken: String,
   forgetpasswordExpiry: Date,
   verifyToken:String,
    verifyTokenExpiry: Date,
    Post: [PostSchema], // Embedding posts directly in the user schema
});

const User = mongoose.models.user as mongoose.Model<IUser>||mongoose.model<IUser>("user",userSchema)
export default User;