import express from "express"
import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local";
import { models, server } from "common";
import session from "express-session"
import { hash } from "./cryptography/cryptography";

passport.serializeUser((user, done) => {

    done(null, (user as models.User)._id);
});

passport.deserializeUser(async (id, done) => {

    await server.withDatabase(async database => {

        const user = await server.getUsers(database).findOne({
            _id: id
        });

        done(null, user);
    });
});

passport.use(new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password"
    },
    async (email, password, done) => {

        await server.withDatabase(async database => {

            const user = await server.getUsers(database).findOne({
                email
            });

            if (user && (await hash.compare(password, user.password_hash))) {

                done(null, user)
            } else {

                done(hash.hash(password) + " does not match" + user?.password_hash, null);
            }
        })
    }
));

export const withPassportConfiguration = (app: express.Express) =>
    app
        .use(express.json())
        .use(session({ secret: "some secret hello", saveUninitialized: true, resave: true }))
        .use(passport.initialize())
        .use(passport.session())
        .post(
            '/login',
            passport.authenticate('local', {
                successRedirect: '/',
                failureRedirect: '/login?error=true'
            })
        )
        .post(
            "/logout",
            (request, response) => {

                request.logout();
                response.redirect("/");
            }
        );
