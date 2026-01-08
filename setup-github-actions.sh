#!/bin/bash
# Quick setup script for GitHub Actions deployment
# Run this on your server: bash setup-github-actions.sh

echo "🔑 Setting up GitHub Actions SSH key..."
echo ""

# Navigate to SSH directory
cd ~/.ssh || exit

# Generate SSH key for GitHub Actions
if [ ! -f github_deploy ]; then
    echo "Generating new SSH key..."
    ssh-keygen -t rsa -b 4096 -f github_deploy -N ""
    echo "✅ SSH key generated"
else
    echo "ℹ️  SSH key already exists"
fi

# Add public key to authorized_keys
if ! grep -q "$(cat github_deploy.pub)" authorized_keys 2>/dev/null; then
    cat github_deploy.pub >> authorized_keys
    chmod 600 authorized_keys
    echo "✅ Public key added to authorized_keys"
else
    echo "ℹ️  Public key already in authorized_keys"
fi

echo ""
echo "═══════════════════════════════════════════════════════"
echo "✅ Setup complete!"
echo "═══════════════════════════════════════════════════════"
echo ""
echo "📋 Copy this PRIVATE KEY and add it to GitHub Secrets:"
echo "   Secret name: SSH_PRIVATE_KEY"
echo ""
echo "---BEGIN PRIVATE KEY---"
cat github_deploy
echo "---END PRIVATE KEY---"
echo ""
echo "🔗 Add secrets here:"
echo "   https://github.com/TemitopeGX/tgx-backend/settings/secrets/actions"
echo ""
echo "📝 Other secrets to add:"
echo "   REMOTE_HOST: 198.187.29.126"
echo "   REMOTE_USER: bismsjai"
echo "   REMOTE_PORT: 22"
echo "   REMOTE_TARGET: /home/bismsjai/test.bismight.co.uk"
echo ""
