
# check whether another git user has set up their ssh keys or credentials on this computer

ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew install caskroom/cask/brew-cask
brew tap caskroom/versions
brew cask install sublime-text3
cd ~
git clone https://github.com/${login}/${repoName}.git

# If this doesn't work, try cloning as repoName-1, repoName-2, repoName-3, etc.
# Then post to the server to update the repoName on their local machine

cd ${repoName}
subl .

# what if they are accessing the app using a different computer than they usually use?
# we should probably provide a script for setting up a new machine with their old data.
# Though... this exact same script would probably work.
# So we just need to tell them to run this on every machine they're going to use.

# but how do we know if they're using a different computer than usual?
# If their userAgent doesn't match some very core things - like OS version - then we know for sure.
# But it's very possible that they could be using two different macs with the same version, so the userAgent would be the same.
# We might just need to handle those in the "Getting errors?" section.

# Do we need to setup the osxkeychain for them? What if they're using Windows? There are so many different possibilities.


