# Good Morning

## Weather
Is it safe to bike today?

1. Current weather
2. Current temp
3. Expected weather at noon
4. expected temp at noon


# Stretch
* Start coffee maker
* Turn on kitchen lights


## Setting Up The Environment

### Dependencies
1 ask cli, `npm install -g ask-cli`
  * You may need to sudo if you so choose

2 aws cli, `sudo apt-get install awscli`

### Commands
1 `aws configure`
  * Follow the prompts for the key and secret key
  1. Default region name: `us-east-1`
  2. Default output format: `text`

2 `ask init`
  * Note: I was on a server so you may need to use the no-browser option

3 `ask clone -s <skill id>`