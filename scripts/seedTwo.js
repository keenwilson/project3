// This seedTwo file will add attendance to students
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let MONGODB_URI =
  process.env.MONGODB_URL || "mongodb://localhost/fullstackclassroom";
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  family: 4 // Use IPv4, skip trying IPv6
};

const classroomSchema = new mongoose.Schema(
  {
    subject: {
      $type: String,
      minlength: 5,
      maxlength: 150,
      required: true,
      index: true
    },
    teacherId: {
      $type: Schema.Types.ObjectId,
      ref: "Teacher"
    },
    imagePath: { $type: String },
    roomNumber: Schema.Types.Mixed,
    studentsId: [
      {
        $type: Schema.Types.ObjectId,
        ref: "Student"
      }
    ],
    assignmentsId: [
      {
        $type: Schema.Types.ObjectId,
        ref: "Assignment"
      }
    ]
  },
  { typeKey: "$type" }
);

const Classroom = mongoose.model("Classroom", classroomSchema);

const teacherSchema = new mongoose.Schema(
  {
    firstName: {
      $type: String,
      required: true,
      minlength: 2,
      maxlength: 50
    },
    lastName: {
      $type: String,
      required: true,
      minlength: 2,
      maxlength: 50
    },
    email: {
      $type: String,
      required: true,
      index: true
    },
    classroomsId: [Schema.Types.ObjectId]
  },
  { typeKey: "$type" }
);

const Teacher = mongoose.model("Teacher", teacherSchema);

const assignmentSchema = new mongoose.Schema(
  {
    assignmentName: {
      $type: String,
      required: true
    },
    assignmentType: {
      $type: String,
      required: true
    },
    classroomId: {
      $type: Schema.Types.ObjectId,
      required: true
    }
  },
  { typeKey: "$type" }
);

const Assignment = mongoose.model("Assignment", assignmentSchema);

const attendanceSchema = new mongoose.Schema(
  {
    classDate: {
      $type: Date,
      index: true
    },
    isPresent: {
      $type: Boolean,
      default: false
    },
    classroomId: {
      $type: Schema.Types.ObjectId,
      ref: "Classroom"
    },
    studentId: {
      $type: Schema.Types.ObjectId,
      ref: "Student"
    }
  },
  { typeKey: "$type" }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      $type: String,
      required: true,
      minlength: 2,
      maxlength: 50
    },
    lastName: {
      $type: String,
      required: true,
      minlength: 2,
      maxlength: 50
    },
    classroomId: {
      $type: Schema.Types.ObjectId,
      ref: "Classroom"
    },
    attendance: [
      {
        attendanceId: {
          $type: Schema.Types.ObjectId,
          ref: "Attendace"
        },
        isCheckedIn: { $type: Boolean, default: false }
      }
    ],
    assignments: [
      {
        assignmentId: {
          $type: Schema.Types.ObjectId,
          ref: "Assignment"
        },
        grade: String,
        dateSubmitted: Date
      }
    ]
  },
  { typeKey: "$type" }
);

const Student = mongoose.model("Student", studentSchema);

const classroomSeed = [
  {
    subject: "Grade 7 Earth Science",
    teacher: {
      firstName: "Ralph",
      lastName: "Fogarty",
      email: "rfogarty@abacus.com"
    },
    imagePath:
      "https://www.edc.org/sites/default/files/images/earth-science.jpg",
    roomNumber: "253",
    assignments: [
      {
        assignmentName: "Unit 1.1 Celery Experiment, Water Clock",
        assignmentType: "Lab"
      },
      {
        assignmentName: "Unit 1.2 Celery Experiment, Comparing Volume and Mass",
        assignmentType: "Lab"
      },
      {
        assignmentName: "Observation and Measurement",
        assignmentType: "Test"
      },
      {
        assignmentName: "Unit 8.1 Life on Another Planet",
        assignmentType: "Activity"
      },
      {
        assignmentName: "Unit 8.2 Planet Game",
        assignmentType: "Activity"
      },
      {
        assignmentName: "Unit 8.3 Star Gazing",
        assignmentType: "Activity"
      }
    ],
    students: [
      { firstName: "Maisy", lastName: "Velasquez" },
      { firstName: "Lana", lastName: "Rivera" },
      { firstName: "Loni", lastName: "Johnston" },
      { firstName: "Tristan", lastName: "Terry" },
      { firstName: "Abdul", lastName: "Day" },
      { firstName: "Jessie", lastName: "Clarke" },
      { firstName: "Mae", lastName: "Bray" },
      { firstName: "Patricia", lastName: "Hansen" }
    ],
    attendance: [
      { classDate: new Date("March 18, 2019") },
      { classDate: new Date("March 19, 2019") },
      { classDate: new Date("March 20, 2019") },
      { classDate: new Date("March 21, 2019") },
      { classDate: new Date("March 22, 2019") }
    ]
  },
  {
    subject: "Grade 8 English",
    teacher: {
      firstName: "Filiberto",
      lastName: "Luckey",
      email: "fluckey@abacus.com"
    },
    imagePath: "https://www.uab.edu/news/images/english_class_2018.jpg",
    roomNumber: "255",
    assignments: [
      {
        assignmentName: "Unit 4 Read Section I in The Elements of Style",
        assignmentType: "Reading"
      },
      {
        assignmentName: "Unit 4 Continue reading A Wrinkle in Time",
        assignmentType: "Reading"
      }
    ],
    students: [
      { firstName: "Tanisha", lastName: "Ivery" },
      { firstName: "Rufus", lastName: "Dugger" },
      { firstName: "Kassie", lastName: "Deshaies" },
      { firstName: "Chet", lastName: "Kranzry" },
      { firstName: "Edmund", lastName: "Byram" },
      { firstName: "Eulalia", lastName: "Mcguffie" },
      { firstName: "Aja", lastName: "Reichenbach" }
    ],
    attendance: [
      { classDate: new Date("March 18, 2019") },
      { classDate: new Date("March 19, 2019") },
      { classDate: new Date("March 20, 2019") },
      { classDate: new Date("March 21, 2019") },
      { classDate: new Date("March 22, 2019") }
    ]
  },
  {
    subject: "Grade 6 Ancient Civilizations",
    teacher: {
      firstName: "Elliot",
      lastName: "East",
      email: "eeast@abacus.com"
    },
    imagePath:
      "https://img.gtvcdn.com/cdn/farfuture/iBIFwhBaWxKaI86wqi7H-loTAoL8eeAdMWyWB3t-gIY/mtime%3A1522684407/sites/default/files/imagecache/keyart_1180x664/img_16x9_landsacpe_title/152721_ancient-civilizations_16x9_0.jpg",
    roomNumber: "353",
    assignments: [
      {
        assignmentName: "Read The Changing Society of the Middle Ages",
        assignmentType: "Reading"
      },
      {
        assignmentName: "Write a letter from the perspective of Marco Polo",
        assignmentType: "Writing"
      },
      {
        assignmentName: "Medieval Entertainment",
        assignmentType: "Activity"
      }
    ],
    students: [
      { firstName: "Luis", lastName: "Mccarthy" },
      { firstName: "Calvin", lastName: "Hunt" },
      { firstName: "Loulou", lastName: "Burke" },
      { firstName: "Jane", lastName: "Berry" },
      { firstName: "Leona", lastName: "Mcbride" },
      { firstName: "Patricia", lastName: "Fleming" },
      { firstName: "Hana", lastName: "Abbott" },
      { firstName: "Libby", lastName: "Walton" }
    ],
    attendance: [
      { classDate: new Date("March 18, 2019") },
      { classDate: new Date("March 19, 2019") },
      { classDate: new Date("March 20, 2019") },
      { classDate: new Date("March 21, 2019") },
      { classDate: new Date("March 22, 2019") }
    ]
  }
];

async function seed() {
  await mongoose
    .connect(
      MONGODB_URI,
      options
    )
    .then(() => {
      console.log("Seed: Connected to Database");
    })
    .catch(err => {
      console.log("Seed: Not Connected to Database ERROR! ", err);
    });

  for (let classroom of classroomSeed) {
    // Get classroomId from the subject
    const {
      _id: currentClassroomId,
      subject: currentSubject
    } = await Classroom.findOne({
      subject: classroom.subject
    });

    console.log("current subject", currentSubject);

    // Find ids of attendance in that classroom
    Attendance.find(
      {
        classroomId: currentClassroomId
      },
      function(err, docs) {
        // docs is an array
      }
    );

    // Find students in the current classroom
    Student.find(
      {
        classroomId: currentClassroomId
      },
      function(err, docs) {
        // docs is an array
        console.log("found students in class id", currentSubject, docs);

        for (let i = 0; i < docs.length; i++) {
          docs[i].attendance = [
            new Attendance({
              classDate: new Date("March 18, 2019"),
              classroomId: currentClassroomId,
              studentId: studentsInClass._id
            }),
            new Attendance({
              classDate: new Date("March 19, 2019"),
              classroomId: currentClassroomId,
              studentId: studentsInClass._id
            }),
            new Attendance({
              classDate: new Date("March 20, 2019"),
              classroomId: currentClassroomId,
              studentId: studentsInClass._id
            }),
            new Attendance({
              classDate: new Date("March 21, 2019"),
              classroomId: currentClassroomId,
              studentId: studentsInClass._id
            }),
            new Attendance({
              classDate: new Date("March 22, 2019"),
              classroomId: currentClassroomId,
              studentId: docs[i]._id
            })
          ];
        }
        console.log("Add attendance to students");
      }
    );
  }

  mongoose.disconnect();

  console.info("SeedTwo: Done!");
}

seed();
