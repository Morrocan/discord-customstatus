const discord = require("discord.js"),
  util = require("util"),
  sleep = util.promisify(setTimeout);

const client = new discord.Client({ fetchAllMembers: true });

client.on("ready", async () => {
  console.log("Client is ready. Node is superior to python :)");

  const guild = await client.guilds.fetch("PUT SERVER ID HERE", true, false),
    role = await guild.roles.fetch("PUT ROLE ID HERE");

  for (true; true; true) {
    for (const member of guild.members.cache.values()) {
      let found = false;

      for (const activity of member.presence.activities.values()) {
        if (activity.type == "CUSTOM_STATUS") {
          found = true;
          if (activity.state.includes("PUT STATUT HERE")) {
            if (!member.roles.cache.has(role.id)) await member.roles.add(role);
            await sleep(1000);
          } else {
            if (member.roles.cache.has(role.id))
              await member.roles.remove(role);
            await sleep(1000);
          }
        }
      }

      if (!found) {
        if (member.roles.cache.has(role.id)) await member.roles.remove(role);
        await sleep(1000);
      }
    }
  }
});

client.login("TOKEN");
