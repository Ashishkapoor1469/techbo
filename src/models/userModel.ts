import mongoose,{Schema,Document} from "mongoose";

export interface IuserPost extends Document{
    id: string; 
    type: "article" | "package" | "user_update";
    title: string;
    excerpt?: string;
    author: {
        name: string;
        avatarUrl?: string;
        profileUrl?: string;
    };
    imageUrl?: string;
    dataAiHint?: string;
    timestamp?: string;
    likes?: number;
    comments?: number;
    tags?: string[];
    link?: string;
}
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    isAdmin?: boolean;
    isVerified: boolean;
    forgotPasswordToken?: string;
    forgetpasswordExpiry?: Date;
    verifyToken?: string;
    verifyTokenExpiry?: Date;
    Post:IuserPost[];
}
const PostSchema: Schema<IuserPost> = new mongoose.Schema({
    
    id: { type: String, required: true },
    type: { type: String, enum: ["article", "package", "user_update"], required: true },
    title: { type: String, required: true, maxlength: 100 },
    excerpt: { type: String, maxlength: 500 },

        

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
    isVerified: {
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