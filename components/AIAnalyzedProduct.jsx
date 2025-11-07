/**
 * AI-Analyzed Product Display Component
 *
 * Displays product information and AI-generated safety analysis for baby food products
 * that were analyzed using the Claude API but don't have lab test results.
 *
 * @module components/AIAnalyzedProduct
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

/**
 * Main component for displaying AI-analyzed product information
 *
 * @param {Object} props
 * @param {Object} props.product - Product information
 * @param {Object} props.analysis - AI analysis results
 * @param {string} props.source - Data source (Open Food Facts, UPCitemdb)
 * @param {string} [props.analyzedAt] - When the analysis was performed
 * @param {boolean} [props.cached] - Whether this is from cache
 */
export function AIAnalyzedProduct({ product, analysis, source, analyzedAt, cached = false }) {
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 90) return 'bg-green-50 border-green-200';
    if (score >= 75) return 'bg-blue-50 border-blue-200';
    if (score >= 60) return 'bg-yellow-50 border-yellow-200';
    if (score >= 40) return 'bg-orange-50 border-orange-200';
    return 'bg-red-50 border-red-200';
  };

  const getScoreLabel = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'Good';
    if (score >= 60) return 'Fair';
    if (score >= 40) return 'Poor';
    return 'Avoid';
  };

  const getMicroplasticsColor = (risk) => {
    const colors = {
      none: 'bg-green-100 text-green-800 border-green-200',
      low: 'bg-blue-100 text-blue-800 border-blue-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      high: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[risk] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header with product info */}
      <div className="text-center space-y-4">
        {product.image_url && (
          <div className="w-full max-w-xs mx-auto">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-auto max-h-64 object-contain rounded-lg shadow-md"
            />
          </div>
        )}

        <div className="space-y-2">
          <div className="flex flex-wrap gap-2 justify-center items-center">
            <Badge variant="secondary" className="font-medium">
              AI-Analyzed
            </Badge>
            <Badge variant="outline" className="font-normal">
              {source}
            </Badge>
            {cached && (
              <Badge variant="outline" className="font-normal text-gray-600">
                <Icons.refreshCw className="w-3 h-3 mr-1" />
                Cached
              </Badge>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {product.name}
          </h1>
          <p className="text-lg md:text-xl text-gray-600">{product.brand}</p>

          {analyzedAt && (
            <p className="text-sm text-gray-500">
              Analyzed {formatDate(analyzedAt)}
            </p>
          )}
        </div>

        {/* Overall Score Circle */}
        <div className={`inline-flex items-center justify-center p-6 rounded-2xl border-2 ${getScoreBgColor(analysis.overallScore)}`}>
          <div className="relative w-32 h-32">
            {/* Background circle */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-200"
              />
              {/* Progress circle */}
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - analysis.overallScore / 100)}`}
                className={getScoreColor(analysis.overallScore)}
                strokeLinecap="round"
              />
            </svg>
            {/* Score text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-4xl font-bold ${getScoreColor(analysis.overallScore)}`}>
                {analysis.overallScore}
              </span>
              <span className="text-sm font-medium text-gray-600 mt-1">
                {getScoreLabel(analysis.overallScore)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Important Notice */}
      <Alert className="border-blue-200 bg-blue-50">
        <Icons.info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-sm text-gray-700 ml-2">
          <strong className="text-blue-900">AI-Generated Analysis:</strong> This product hasn't been independently lab-tested yet.
          Analysis is based on ingredients and product information from {source}.
          For verified heavy metals data, consider requesting lab testing.
        </AlertDescription>
      </Alert>

      {/* Harmful Substances */}
      <Card className="rounded-3xl border-0 shadow-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-red-50 to-red-50/50">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center text-lg">
              <Icons.alertCircle className="w-6 h-6 mr-2 text-red-600" />
              Harmful Substances
            </span>
            <Badge variant="destructive" className="text-base px-3 py-1">
              {analysis.harmfulSubstances.count}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {analysis.harmfulSubstances.count === 0 ? (
            <div className="flex items-center text-green-700 bg-green-50 rounded-lg p-4">
              <Icons.checkCircle className="w-5 h-5 mr-2" />
              <span>No concerning substances identified</span>
            </div>
          ) : (
            <ul className="space-y-3">
              {analysis.harmfulSubstances.details.map((substance, idx) => (
                <li key={idx} className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                  <Icons.alertTriangle className="w-5 h-5 mt-0.5 text-red-500 flex-shrink-0" />
                  <span className="text-gray-700 text-sm leading-relaxed">{substance}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Microplastics Risk */}
      <Card className="rounded-3xl border-0 shadow-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-50/50">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center text-lg">
              <Icons.droplet className="w-6 h-6 mr-2 text-blue-600" />
              Microplastics Risk
            </span>
            <Badge className={`${getMicroplasticsColor(analysis.microplasticsRisk)} text-base px-3 py-1 border`}>
              {analysis.microplasticsRisk.toUpperCase()}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-gray-700 leading-relaxed">{analysis.microplasticsReason}</p>
        </CardContent>
      </Card>

      {/* Beneficial Ingredients */}
      <Card className="rounded-3xl border-0 shadow-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-50 to-green-50/50">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center text-lg">
              <Icons.checkCircle className="w-6 h-6 mr-2 text-green-600" />
              Beneficial Ingredients
            </span>
            <Badge className="bg-green-100 text-green-800 border-green-200 text-base px-3 py-1 border">
              {analysis.beneficialIngredients.count}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {analysis.beneficialIngredients.count === 0 ? (
            <p className="text-gray-600">No standout beneficial ingredients identified</p>
          ) : (
            <ul className="space-y-3">
              {analysis.beneficialIngredients.details.map((ingredient, idx) => (
                <li key={idx} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <Icons.checkmark className="w-5 h-5 mt-0.5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 text-sm leading-relaxed">{ingredient}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Concerns */}
      {analysis.concerns && analysis.concerns.length > 0 && (
        <Card className="rounded-3xl border-0 shadow-xl overflow-hidden bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Icons.alertTriangle className="w-6 h-6 mr-2 text-yellow-600" />
              Parent Concerns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {analysis.concerns.map((concern, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <span className="text-yellow-600 text-lg leading-none mt-0.5">•</span>
                  <span className="text-gray-700 text-sm leading-relaxed">{concern}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      <Card className="rounded-3xl border-0 shadow-xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Icons.lightbulb className="w-6 h-6 mr-2 text-blue-600" />
            Our Recommendation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed text-base">{analysis.recommendations}</p>
        </CardContent>
      </Card>

      {/* Ingredients */}
      {product.ingredients && (
        <Card className="rounded-3xl border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg">Ingredients List</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 leading-relaxed">{product.ingredients}</p>
          </CardContent>
        </Card>
      )}

      {/* Product Categories */}
      {product.categories && (
        <Card className="rounded-3xl border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg">Product Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {product.categories.split(',').map((cat, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {cat.trim()}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Request Lab Testing CTA */}
      <Card className="rounded-3xl border-0 shadow-xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
        <CardContent className="p-8 text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Icons.flask className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Want Lab-Verified Data?</h3>
          <p className="text-gray-600 max-w-xl mx-auto">
            Request independent laboratory testing for heavy metals (lead, arsenic, cadmium, mercury)
            and other contaminants for this product. Help build our database of verified baby food safety data.
          </p>
          <Button size="lg" className="rounded-full">
            <Icons.flask className="w-5 h-5 mr-2" />
            Request Lab Testing
          </Button>
        </CardContent>
      </Card>

      {/* Data Source Attribution */}
      <div className="text-center text-sm text-gray-500 pt-4 border-t">
        <p>
          Product data provided by <strong>{source}</strong>
        </p>
        <p className="mt-1">
          Safety analysis powered by Claude AI • Not a substitute for professional medical advice
        </p>
      </div>
    </div>
  );
}

export default AIAnalyzedProduct;
