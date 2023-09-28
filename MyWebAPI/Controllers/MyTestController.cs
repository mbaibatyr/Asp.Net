using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyWebAPI.Model;

namespace MyWebAPI.Controllers
{
    [Route("test")]
    [ApiController]
    public class MyTestController : ControllerBase
    {
        [HttpGet, Route("Hello/{name}")]
        public string Hello(string name)
        {
            return "Hello " + name;
        }

        [HttpGet, Route("Add/{a}/{b}")]
        public int Add(int a, int b)
        {
            return a + b;
        }

        [HttpGet, Route("getStudent")]
        public Student getStudent()
        {
            return new Student
            {
                Id = 1,
                LastName = "Иванов",
                FirstName = "Аскар",
                BirthDate = DateTime.Now.AddYears(-20)
            };
        }

        [HttpGet, Route("getStudents")]
        public List<Student> getStudents()
        {
            return new List<Student>()
            {
                new Student
                {
                    Id = 1,
                    LastName = "Иванов",
                    FirstName = "Аскар",
                    BirthDate = DateTime.Now.AddYears(-20)
                },
                new Student
                {
                    Id = 2,
                    LastName = "Иванов123",
                    FirstName = "Аскар123",
                    BirthDate = DateTime.Now.AddYears(-15)
                }
            };
        }


        [HttpPost, Route("addStudent")]
        public List<Student> addStudent(Student student)
        {
            var students = new List<Student>()
            {
                new Student
                {
                    Id = 1,
                    LastName = "Иванов",
                    FirstName = "Аскар",
                    BirthDate = DateTime.Now.AddYears(-20)
                },
                new Student
                {
                    Id = 2,
                    LastName = "Иванов123",
                    FirstName = "Аскар123",
                    BirthDate = DateTime.Now.AddYears(-15)
                }
            };
            students.Add(student);
            return students;
        }

        [HttpPut, Route("changeStudent/{id}")]
        public List<Student> changeStudent(Student student, int id)
        {
            var students = new List<Student>()
            {
                new Student
                {
                    Id = 1,
                    LastName = "Иванов",
                    FirstName = "Аскар",
                    BirthDate = DateTime.Now.AddYears(-20)
                },
                new Student
                {
                    Id = 2,
                    LastName = "Иванов123",
                    FirstName = "Аскар123",
                    BirthDate = DateTime.Now.AddYears(-15)
                }
            };

            var st = students.Where(z => z.Id == id).FirstOrDefault();
            if (st != null)
            {
                st.FirstName = student.FirstName;
                st.LastName = student.LastName;
                st.BirthDate = student.BirthDate;
            }
            return students;
        }


        [HttpGet, Route("deleteStudent/{id}")]
        public List<Student> deleteStudent(int id)
        {
            var students = new List<Student>()
            {
                new Student
                {
                    Id = 1,
                    LastName = "Иванов",
                    FirstName = "Аскар",
                    BirthDate = DateTime.Now.AddYears(-20)
                },
                new Student
                {
                    Id = 2,
                    LastName = "Иванов123",
                    FirstName = "Аскар123",
                    BirthDate = DateTime.Now.AddYears(-15)
                }
            };

            var st = students.Where(z => z.Id == id).FirstOrDefault();
            if(st != null)
                students.Remove(st);
            return students;
        }
    }
}
