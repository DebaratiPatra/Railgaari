import mongoose, { Schema } from "mongoose"

const stationSchema = new Schema ({
    station_name: {
        type: String,
        required: [true, "Station name is required"],
        trim: true,
        maxlength: [100, "Station name cannot exceed 100 characters"],
    },
    station_code: {
        type: String,
        required: [true, "Station code is required"],
        trim: true,
        unique: [true, "Station code must be unique"],
        maxlength: [10, "Station code cannot exceed 10 characters"]
    },
    isActive:{
        type:Boolean,
        //active=1, notActive=0
        default:true,
    },
    station_type:{
        type:String,
        required: [true, "Station type is required"],
    },
    line_color_code:{
        type: [String],
        required: true,
        Validitor:{
            validate: v => v.length>0,
            message:"Station must have atleast one colour code"
        }
    },
    connected_metro_stations:{
        type: [[String]],
    },     
    connected_railway_stations:{
        type: [[String]],
    }
    
})
stationSchema.index({station_name:1});

const Station = mongoose.model("Station", stationSchema);

export default Station;