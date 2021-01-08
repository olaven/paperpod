import { models, server } from "common";
import { nanoid } from "nanoid";
import { ObjectID, WithId } from "mongodb";
import { BAD_REQUEST, CREATED, NOT_FOUND, NO_CONTENT, OK } from "node-kall";
import { compare, hash } from "./hash";
import { authenticated } from "./passport";
import session from "express-session"
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local"
import express from "express"
import { getUsers, withDatabase } from "common/src/server/server";






server.boot("authentication", app => {

    app.use(session({ secret: "some secret hello", saveUninitialized: false, resave: false }))

    passport.serializeUser(function (user, done) {

        console.log("Inside serialize", user);
        done(null, (user as models.User)._id);
    });

    passport.deserializeUser(async function (id, done) {

        await withDatabase(async database => {
            const user = await getUsers(database).findOne({
                _id: id
            });

            console.log("Got id ", id, "and found user", user);
            done(null, user)
        });
    });

    passport.use(new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password"
        },
        async function (email, password, done) {

            console.log("Inside strategy", email, password);
            await withDatabase(async database => {

                const user = await getUsers(database).findOne({
                    email
                });

                if (user && (await compare(password, user.password_hash))) {

                    done(null, user)
                } else {

                    done(hash(password) + " does not match" + user.password_hash, null);
                }


            })
        }
    ));

    app.use(passport.initialize());
    app.use(passport.session());


    app.post(
        '/login',
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login'
        })
    );

    app.get(
        "/test",
        passport.authenticate('local'),
        (request, response) => {

            console.log("Inside local authentication")
            response.json({
                id: "some-id",
                email: "test-strategy@mail.com",
                password: "some random password",
            })
        }
    )

    app.get("/reset", async (request, response) => {


        console.log("RESETTING")
        await withDatabase(async database => {

            const users = await getUsers(database).find({ email: "olav@sundfoer.com" });

            console.log("going to delete", (await users.count()), "users")
            await getUsers(database).deleteMany({
                email: "olav@sundfoer.com"
            });
            response.status(OK).json("DONE");
        });
    })

    app.post("/users", async (request, response) => {

        const credentials = request.body as models.UserCredentials;
        console.log("persist", credentials.email, "with password", credentials.password);

        await withDatabase(async database => {

            const user: models.User = {
                _id: nanoid(),
                email: credentials.email,
                password_hash: await hash(credentials.password)
            }
            await getUsers(database).insertOne(user as any as WithId<models.User>)
            response.status(CREATED).json(user);
        });
    });



});