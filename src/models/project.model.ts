import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
    },
    imageUrl: {
      type: String,
      required: [true, "Project image is required"],
    },
    cloudinaryId: {
      type: String,
      required: false,
    },
    tags: {
      type: [String],
      default: [],
    },
    demoLink: {
      type: String,
      default: "",
    },
    githubLink: {
      type: String,
      default: "",
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;