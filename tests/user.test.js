import supertest from "supertest";
import { assert, expect } from "chai";

const request = supertest("http://localhost:3009");
const userName = "randomUserName";
const eMail = "workingMail@gmail.com";
let userId;

describe("POST /user", () => {
    
    describe("given username and email", () => {
        it("should return the added user document", async () => {
            const response = await request.post("/user").send({
                userName,
                eMail
            });
            assert.equal(response.statusCode, 200);
            userId = response.body.userId;
        });

        it("should return status 500 with message Username should contain only alphabets if username contains non-alphabets", async () => {
            const response = await request.post("/user").send({
                "userName": `${userName}123`,
                eMail,
            });
            assert.equal(response.statusCode, 500);
            assert.equal(response.body.error, "Username should contain only alphabets");
        });

        it("should return status 500 with message Username already exists if username already exists", async () => {
            
            const response = await request.post("/user").send({
                userName,
                "eMail": "existinguser@example.com"
            });
            assert.equal(response.statusCode, 500);
            assert.equal(response.body.error, "Username already exists");
        });

        it("should return status 500 with message Email already exists if email already exists", async () => {
            
            const response = await request.post("/user").send({
                "userName": "NewUser",
                eMail,
            });
            assert.equal(response.statusCode, 500);
            assert.equal(response.body.error, "Email already exists");
        });

        it("should return status 500 with message Invalid email format if email is not valid", async () => {
            const response = await request.post("/user").send({
                "userName": "NewUser",
                "eMail": "invalidemailformat"
            });
            assert.equal(response.statusCode, 500);
            assert.equal(response.body.error, "Invalid email format");
        });

    });
});

describe("GET /user/:id", () => {
    describe("given the user id of the existing user", () => {
        it("should return the details of the user", async () => {
            const response = await request.get(`/user/${userId}`);
            assert.equal(response.statusCode, 200);
            expect(response.body).to.have.property("userId");
        })
    })
    describe("given the wrong user id of the existing user", () => {
        it("should return error with status code 500 with message User does not exists", async () => {
            const response = await request.get(`/user/${"wronguserid"}`);
            assert.equal(response.statusCode, 500);
            assert.equal(response.body.error, "User does not exists");
        })
    })
});


describe("PUT /user", () => {
    describe("given the correct user id of the existing user", () => {
        describe("given proper username", () => {
            it("should return the status code 200", async () => {
                const response = await request.put("/user").send({
                    userId,
                    userName: "UpadatedUserName"
                });
                assert.equal(response.statusCode, 200);
            })
        })
        describe("given proper email", () => {
            it("should return the status code 200", async () => {
                const response = await request.put("/user").send({
                    userId,
                    email: "updatedworkingmail@gmail.com"
                });
                assert.equal(response.statusCode, 200);
            })
        })
        describe("given in valid username", () => {
            it("should return status 500 with message Username should contain only alphabets if username contains non-alphabets", async () => {
                const response = await request.put("/user").send({
                    userId,
                    userName: "UpadatedUserName1234"
                });
                assert.equal(response.statusCode, 500);
                assert.equal(response.body.error, "Username should contain only alphabets");
            });
        })
        describe("given in valid email", () => {
            it("should return status 500 with message Invalid email format if email is not valid", async () => {
                const response = await request.post("/user").send({
                    userId,
                    "eMail": "invalidemailformat"
                });
                assert.equal(response.statusCode, 500);
                assert.equal(response.body.error, "Invalid email format");
            });
        })
    })
    describe("given the wrong user id of the existing user", () => {
        it("should return error with status code 500 with message User does not exists", async () => {
            const response = await request.put(`/user`).send({
                userId: "invaliduserId",
            });;
            assert.equal(response.statusCode, 500);
            assert.equal(response.body.error, "User does not exists");
        })
    })
    
});


describe("DELETE /user", () => {
    describe("given the user id of the existing user", () => {
        it("should delete the user doucment", async () => {
            const response = await request.delete(`/user`).send({
                userId
            });
            assert.equal(response.statusCode, 200);
        })
    })
    describe("given the wrong user id of the existing user", () => {
        it("should return error with status code 500 with message User does not exists", async () => {
            const response = await request.delete(`/user`).send({
                userId: "invaliduserId",
            });;
            assert.equal(response.statusCode, 500);
            assert.equal(response.body.error, "User does not exists");
        })
    })
});