import { Website, RegisterWebsite, WebsitePageDefinition } from "@hotbunny/hackhub-content-sdk";
import homePage from "./pages/home.html";
import aboutPage from "./pages/about.html";

@RegisterWebsite
export class ExampleSite extends Website {

    SiteName = "cant-hack-this";
    Host = "cant-hack-this.mod";
    Icon = "";

    Popular = true;

    Pages: WebsitePageDefinition[] = [
        {
            path: "/",
            title: "cant-hack-this - Home",
            description: "Welcome to cant-hack-this. A mod-powered website.",
            html: homePage,
            seo: true,
            search: ["cant-hack-this", "mod", "example"],
        },
        {
            path: "/about",
            title: "cant-hack-this - About",
            description: "Learn more about cant-hack-this and its features.",
            html: aboutPage,
            seo: true,
        },
    ];

    Exports = {
        siteVersion: "1.0.0",
        siteName: "cant-hack-this",
        formatText: (text: string) => text.toUpperCase(),
    };
}
